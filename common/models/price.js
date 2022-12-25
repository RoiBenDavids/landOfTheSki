import {AVAILABLE_CURRENCIES} from '../constants/currencies.js'
import mongoose from 'mongoose'

export default new mongoose.Schema({
    amount: {type: Number},
    currency: {type: String, enum: AVAILABLE_CURRENCIES},
})
