import priceScehma from '../../common/models/price.js'
import mongoose from 'mongoose'
import db from '../../common/models/db.js'

const roomSchema = db.createSchema({
    name: {type: String},
    prices: [
        {
            ...priceScehma.paths,
            start: {type: Date},
            end: {type: Date},
        },
    ],
    couldAddBed: {type: Boolean},
    maxPax: {type: Number},
    hotelCodeName: {type: String},
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'hotels'},
})

roomSchema.statics.findBySiteAndGroupSize = async function (site, groupSize) {
    return this.findSafe({
        $and: [
            {
                site,
                $or: [
                    {maxPax: {$gte: groupSize}},
                    {maxPax: {$gte: groupSize - 1}, couldAddBed: true},
                ],
            },
        ],
    })
}

export default mongoose.model('Rooms', roomSchema)
