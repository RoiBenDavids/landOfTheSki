import logger from '../../common/helpers/logger.js'
import initialData from './initialData/index.js'
import TransfersModel from './transfers.model.js'

const init = async () => {
    try {
        const newTransfers = await TransfersModel.filterDataThatExists(initialData, [
            'site',
            'description',
            'airport',
        ])
        await TransfersModel.insertMany(newTransfers)
    } catch (error) {
        logger.error({error}, 'error initing transfers service')
    }
}

const getPriceForQuota = async (transferId) => {
    const transferOption = await TransfersModel.findByOid(transferId)

    const {_id, price, description, maxPax} = transferOption
    const {amount, currency} = price

    return {_id, price: {amount, currency}, description, maxPax}
}

const getWithPrices = async (site, dates, pax) => {
    const {adult, child} = pax

    const transferOptions = await TransfersModel.findBySiteAndGroupSizeSortedByMaxPax(
        site,
        adult + child
    )

    return transferOptions.map((transferOption) => {
        const {_id, price, description, maxPax} = transferOption
        return {_id, price, description, maxPax}
    })
}

const getBySite = async (site) => TransfersModel.findBySite(site)

export default {init, getPriceForQuota, getBySite, getWithPrices}
