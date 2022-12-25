import transfers from './transfers.service.js'

const getBySite = async (req, res) => {
    const {site} = req.params
    return res.handle(() => transfers.getBySite(site), 'get transfers by site')
}
const getWithPrices = async (req, res) => {
    const {site} = req.params
    const {dates, pax} = req.query
    return res.handle(
        () => transfers.getWithPrices(site, dates, pax),
        'get transfers by site with prices'
    )
}

export default {getBySite, getWithPrices}
