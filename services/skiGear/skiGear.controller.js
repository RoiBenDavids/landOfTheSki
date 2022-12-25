import skiGearService from './skiGear.service.js'

const getBySite = async (req, res) => {
    const {site} = req.params
    return res.handle(() => skiGearService.getBySite(site), 'get ski gear by site')
}

const getWithPrices = async (req, res) => {
    const {site} = req.params
    const {skiDays, pax} = req.query
    return res.handle(() => skiGearService.getWithPrices(site, skiDays, pax), 'get With prices')
}

export default {getBySite, getWithPrices}
