import transfersService from '../../services/transfers/transfers.service.js'
import accomodationsService from '../../services/accomodations/accomodations.service.js'
import skiGearService from './../../services/skiGear/skiGear.service.js'
import skiPassesService from '../../services/skiPasses/skiPasses.service.js'

const test = async () => {
    const site = 'gudauri'
    const dates = {start: '2021-12-17', end: '2021-12-23'}
    const skiDays = 5
    const pax = {adult: 3, child: 1}

    const transfer = await transfersService.getPriceForQuota(site, pax)
    const rooms = await accomodationsService.getPriceForQuota(site, dates, pax)
    const skiGear = await skiGearService.getPriceForQuota(site, skiDays, pax, 'store a')
    const skiPasses = await skiPassesService.getPriceForQuota(site, skiDays, pax)

    console.log(transfer, rooms, skiGear, skiPasses)
}

const getOffer = async (query, objectsIds) => {
    const {dates, skiDays, pax} = query
    const {transferId, roomId, skiGearId, skiPassesId} = objectsIds

    const parsedDates = JSON.parse(dates)
    const parsedSkiDays = parseInt(skiDays)
    const parsedPax = JSON.parse(pax)

    const transfer = await transfersService.getPriceForQuota(transferId)
    const rooms = await accomodationsService.getPriceForQuota(parsedDates, parsedPax, roomId)
    const skiGear = await skiGearService.getPriceForQuota(parsedSkiDays, parsedPax, skiGearId)
    const skiPasses = await skiPassesService.getPriceForQuota(parsedPax, skiPassesId)

    return {transfer, rooms, skiGear, skiPasses}
}

export default {test, getOffer}
