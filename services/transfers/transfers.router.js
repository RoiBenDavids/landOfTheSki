import {serilizeQuery} from '../../common/helpers/expressMiddlewares.js'
import express from 'express'

const router = express.Router()

import controller from './transfers.controller.js'

router.get('/:site', controller.getBySite)
router.get('/with_prices/:site', serilizeQuery, controller.getWithPrices)

export default router
