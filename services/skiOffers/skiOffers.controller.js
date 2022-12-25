import skiOffersService from './skiOffers.service.js'

const getOffer = async (req, res) => {
    return res.handle(() => skiOffersService.getOffer(req.query, req.body), 'get offer')
}

export default {getOffer}
