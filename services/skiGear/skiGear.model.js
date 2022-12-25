import priceScehma from '../../common/models/price.js'
import mongoose from 'mongoose'
import db from '../../common/models/db.js'

const SKI_GEAR_TYPES = ['ski', 'snowboard']

const skiGearSchema = db.createSchema({
    store: {type: String},
    name: {type: String},
    types: [{type: String, enum: SKI_GEAR_TYPES}],
    prices: {
        ...Object.fromEntries(
            [1, 2, 3, 4, 5, 6, 7].map((days) => [
                days,
                {
                    adult: priceScehma,
                    child: priceScehma,
                },
            ])
        ),
    },
})

export default mongoose.model('ski_gear', skiGearSchema)
