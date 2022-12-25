import {serilizeQuery} from '../../common/helpers/expressMiddlewares.js'
import express from 'express'

const router = express.Router()

import controller from './accomodations.controller.js'

router.get('/rooms_with_prices/:site', serilizeQuery, controller.getRoomsWithPrices)
router.get('/:site', controller.getRoomsBySite)

export default router
