import logger from '../../common/helpers/logger.js'
import initialData from './initialData/index.js'
import skiPassesModel from './skiPasses.model.js'
import {getTotalPriceForPax} from '../../common/helpers/utils.js'

const init = async () => {
    try {
        const newSkiPasses = await skiPassesModel.filterDataThatExists(initialData, [
            'site',
            'name',
        ])
        await skiPassesModel.insertMany(newSkiPasses)
    } catch (error) {
        logger.error({error}, 'error initing ski passes service')
    }
}

const getPriceForQuota = async (pax, skiPassesId) => {
    const skiPass = await skiPassesModel.findByOid(skiPassesId)
    return getTotalPriceForPax(pax, skiPass.prices)
}

const getWithPrices = async (site, skiDays, pax) => {
    const skiPasses = await skiPassesModel.findSafe({site, dayLimit: skiDays})

    return skiPasses.map((skiPass) => {
        const {prices, _id, name} = skiPass
        const price = getTotalPriceForPax(pax, prices)
        return {price, _id, name}
    })
}

const getBySite = async (site) => skiPassesModel.findBySite(site)

export default {init, getPriceForQuota, getBySite, getWithPrices}
