import priceScehma from '../../common/models/price.js'
import mongoose from 'mongoose'
import db from '../../common/models/db.js'
import {ALL_AIRPORT_CODES} from '../../common/constants/airports.js'

const transfersSchema = db.createSchema({
    airport: {type: String, enum: ALL_AIRPORT_CODES},
    description: {type: String},
    maxPax: {type: Number},
    price: priceScehma,
})

transfersSchema.statics.findBySiteAndGroupSizeSortedByMaxPax = function (site, groupSize) {
    const sort = {maxPax: 1}
    return this.findSafe({site, maxPax: {$gte: groupSize}}, null, null, sort)
}

export default mongoose.model('transfers', transfersSchema)
