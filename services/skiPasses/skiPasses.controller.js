import skiPassesService from './skiPasses.service.js'

const getBySite = async (req, res) => {
    const {site} = req.params
    return res.handle(() => skiPassesService.getBySite(site), 'get ski passes by site')
}

const getWithPrices = async (req, res) => {
    const {site} = req.params
    const {pax, skiDays} = req.query
    return res.handle(
        () => skiPassesService.getWithPrices(site, skiDays, pax),
        'get transfers by site with prices'
    )
}

export default {getBySite, getWithPrices}
