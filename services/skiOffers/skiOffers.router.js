import express from 'express'

const router = express.Router()

import controller from './skiOffers.controller.js'

router.get('/get_offer', controller.getOffer)

export default router
