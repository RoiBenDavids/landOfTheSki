import {getTotalPriceForPax} from '../../common/helpers/utils.js'
import logger from '../../common/helpers/logger.js'
import initialData from './initialData/index.js'
import skiGearModel from './skiGear.model.js'

const init = async () => {
    try {
        const newSkiPasses = await skiGearModel.filterDataThatExists(initialData, [
            'site',
            'name',
            'store',
        ])
        await skiGearModel.insertMany(newSkiPasses)
    } catch (error) {
        logger.error({error}, 'error initing ski gear service')
    }
}

const getBySite = async (site) => skiGearModel.findBySite(site)

const getWithPrices = async (site, skiDays, pax) => {
    const skiGears = await skiGearModel.findSafe({site})

    return skiGears.map((skiGear) => {
        const prices = skiGear.prices[skiDays]
        const price = getTotalPriceForPax(pax, prices)

        const {_id, name, types} = skiGear

        return {
            _id,
            name,
            types,
            price,
        }
    })
}

export default {init, getBySite, getWithPrices}
