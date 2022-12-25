import priceScehma from '../../common/models/price.js'
import mongoose from 'mongoose'
import db from '../../common/models/db.js'

const MEAL_TYPES = ['BB', 'AI', 'HB', null]

const hotelSchema = db.createSchema({
    hotelCodeName: {type: String},
    name: {type: String},
    description: {type: String},
    extras: {
        bed: {
            adult: priceScehma,
            child: priceScehma,
            infant: priceScehma,
        },
        breakfast: priceScehma,
        mealType: [{...priceScehma.paths, type: {type: String, enum: MEAL_TYPES}}],
    },
    address: {type: String},
    basicMealType: {type: String, enum: MEAL_TYPES},
})

export default mongoose.model('Hotels', hotelSchema)
