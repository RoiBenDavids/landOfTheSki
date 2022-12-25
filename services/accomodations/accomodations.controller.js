import accomodationsService from './accomodations.service.js'

const getRoomsWithPrices = async (req, res) => {
    const {site} = req.params
    const {dates, pax} = req.query
    console.log({site, dates, pax}, 'GET ROOMS WITH PRICES')
    return res.handle(
        () => accomodationsService.getRoomsWithPrices(site, dates, pax),
        'get rooms with prices'
    )
}

const getRoomsBySite = async (req, res) => {
    console.log('get rooms by site')
    const {site} = req.params
    return res.handle(() => accomodationsService.getRoomsBySite(site), 'get rooms by site')
}

export default {getRoomsWithPrices, getRoomsBySite}
