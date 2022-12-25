import express from 'express'
const router = express.Router()

import accomodations from '../../services/accomodations/accomodations.router.js'
import transfers from '../../services/transfers/transfers.router.js'
import skiGear from '../../services/skiGear/skiGear.router.js'
import skiPasses from '../../services/skiPasses/skiPasses.router.js'
import skiOffers from '../../services/skiOffers/skiOffers.router.js'

router.use('/accommodations', accomodations)
router.use('/transfers', transfers)
router.use('/skiGear', skiGear)
router.use('/skiPasses', skiPasses)
router.use('/skiOffers', skiOffers)

export default router
