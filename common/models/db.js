import mongoose from 'mongoose'
import logger from '../helpers/logger.js'
import {paramCase} from 'change-case'
import {ALL_SITES} from '../../common/constants/sites.js'

const createSchema = (childSchema) => {
    const schema = new mongoose.Schema(
        {
            ...childSchema,
            deleted: {type: Boolean, default: false},
            site: {type: String, enum: ALL_SITES},
            isTest: Boolean,
        },
        {timestamps: true}
    )

    addSchemaFindStatics(schema)
    addSchemaDeleteStatics(schema)
    addSchemaTestStatics(schema)
    addSchemaMethods(schema)

    return schema
}

const init = async (source) => {
    await connect(source)
}

const connectionCallback = (error, db) => (resolve, reject) => {
    error && logger.info({error, db}, 'connected to db - error: ')
    if (error) {
        logger.error({error}, 'Failed to connect to MongoDB')
        reject(error)
    } else {
        resolve()
    }
}

const connect = () => {
    const dbConnectionString = process.env.MONGO_HOST + '/' + paramCase(process.env.PROJECT_NAME)
    logger.info(dbConnectionString, 'Mongo init')
    return new Promise((resolve, reject) => {
        mongoose.set({strictQuery: false})
        mongoose.connect(
            dbConnectionString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error, db) => connectionCallback(error, db)(resolve, reject)
        )
    })
}

const destroy = async () => {
    await mongoose.connection.close()
}

const addGeneralFindStatics = (schema) => {
    schema.statics.countSafe = function (query = {}) {
        return this.countDocuments({...query, deleted: false})
    }

    schema.statics.findSafe = async function (
        query = {},
        pagination = {}, //{page, pageSize}
        projection = {},
        sort = {} // {[sortBy]: sortDir}
    ) {
        try {
            const safeQuery = {...query, deleted: false}

            const options = {sort}
            if (pagination) {
                const {page, pageSize} = pagination
                options.skip = parseInt(pageSize * page)
                options.limit = parseInt(pageSize)
            }
            return await this.find(safeQuery, projection, options)
        } catch (error) {
            logger.error({error}, 'db - error finding safe')
            throw 'db - error finding safe'
        }
    }
}

const addSpecificFindStatics = (schema) => {
    schema.statics.findOneSafe = function (query) {
        try {
            return this.findOne({...query, deleted: false})
        } catch (error) {
            logger.error({error}, 'db - error finding one safe')
            throw 'db - error finding one safe'
        }
    }

    schema.statics.findByOid = function (id) {
        return this.findOneSafe({_id: mongoose.Types.ObjectId(id)})
    }

    schema.statics.findByName = function (name) {
        return this.findOneSafe({name: name.trim()})
    }

    schema.statics.findBySite = function (site) {
        return this.findSafe({site})
    }
}

const addFilterStatics = (schema) => {
    schema.statics.filterDataThatExists = async function (
        allDataToFilterFrom = [],
        fieldsToCheck = []
    ) {
        const allDBData = await this.findSafe()
        return allDataToFilterFrom.filter(
            (data) =>
                !allDBData.some((dbData) =>
                    fieldsToCheck.every(
                        (fieldToCheck) => data[fieldToCheck] === dbData[fieldToCheck]
                    )
                )
        )
    }
}

const addSchemaFindStatics = (schema) => {
    addGeneralFindStatics(schema)
    addSpecificFindStatics(schema)
    addFilterStatics(schema)
}

const addSchemaDeleteStatics = (schema) => {
    schema.statics.softDelete = async function (id, uniqueField) {
        const obj = await this.findByOid(id)
        if (!obj) {
            return null
        }
        obj.deleted = true
        if (uniqueField) {
            obj[uniqueField] = obj[uniqueField] + `_${Date.now()}`
        }
        return await obj.save()
    }

    schema.statics.hardDelete = async function (id) {
        await this.deleteOne({_id: mongoose.Types.ObjectId(id)})
    }

    schema.statics.hardDeleteMany = async function (objs) {
        return await Promise.all(objs.map((obj) => this.hardDelete(obj._id)))
    }
}

const addSchemaTestStatics = (schema) => {
    schema.statics.findTest = function () {
        return this.find({isTest: true})
    }

    schema.statics.clearTest = function () {
        return this.deleteMany({isTest: true})
    }
}

const addSchemaMethods = (schema) => {
    schema.methods.sync = async function (data = {}) {
        this.overwrite({...this._doc, ...data, updated: Date.now()})
        return await this.save()
    }

    schema.methods.getDocumentData = function () {
        const cleanDoc = {...this._doc}
        return cleanDoc
    }
}

export default {
    init,
    destroy,
    createSchema,
}
