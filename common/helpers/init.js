import db from '../models/db.js'
import transfersService from '../../services/transfers/transfers.service.js'
import logger from './logger.js'
import accomodationsService from '../../services/accomodations/accomodations.service.js'
import skiPassesService from '../../services/skiPasses/skiPasses.service.js'
import skiGearService from '../../services/skiGear/skiGear.service.js'

const run = async () => {
    try {
        await db.init()
        await initServicesData()
    } catch (error) {
        logger.error({error}, 'error initing server')
    }
}

const initServicesData = async () => {
    await transfersService.init()
    await accomodationsService.init()
    await skiPassesService.init()
    await skiGearService.init()
}

export default {run}
