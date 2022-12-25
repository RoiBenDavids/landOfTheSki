import priceScehma from '../../common/models/price.js'
import mongoose from 'mongoose'
import db from '../../common/models/db.js'

const skiPassSchema = db.createSchema({
    name: {type: String},
    dayLimit: {type: Number},
    rideLimit: {type: Number},
    prices: {
        adult: priceScehma,
        child: priceScehma,
    },
})

export default mongoose.model('ski_passes', skiPassSchema)
