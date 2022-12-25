import logger from '../../common/helpers/logger.js'
import AccomodationsHotelModel from './accomodations.hotel.model.js'
import AccomodationsRoomModel from './accomodations.room.model.js'
import {_moment} from '../../common/helpers/libraries.js'

import hotelsinitialData from './initialData/hotels/index.js'
import roomsinitialData from './initialData/rooms/index.js'

const initHotels = async () => {
    const newData = await AccomodationsHotelModel.filterDataThatExists(hotelsinitialData, [
        'site',
        'name',
    ])
    await AccomodationsHotelModel.insertMany(newData)
}
const initRoomsBySite = async (site, hotels) => {
    const hotelsInSite = hotels.filter((hotel) => hotel.site === site)
    const initialRoomsBySite = roomsinitialData[site]
    const newRooms = await AccomodationsRoomModel.filterDataThatExists(initialRoomsBySite, [
        'site',
        'hotelCodeName',
        'name',
    ])

    const roomsWithHotelId = newRooms.map((newRoom) => {
        const matchingHotel = hotelsInSite.find(
            (hotelInSite) => hotelInSite.hotelCodeName === newRoom.hotelCodeName
        )
        if (!matchingHotel) {
            throw `no matching hotel for ${newRoom.hotelCodeName}`
        }
        return {...newRoom, hotel: matchingHotel._id}
    })
    await AccomodationsRoomModel.insertMany(roomsWithHotelId)
}
const initRooms = async () => {
    const hotels = await AccomodationsHotelModel.findSafe()
    const sites = await AccomodationsHotelModel.distinct('site')
    await Promise.all(sites.map((site) => initRoomsBySite(site, hotels)))
}

const init = async () => {
    try {
        await initHotels()
        await initRooms()
    } catch (error) {
        logger.error({error}, 'error initing accomofation service')
    }
}

const getHotelsBySite = async (site) => AccomodationsRoomModel.findBySite(site)
const getRoomsBySite = async (site) => AccomodationsRoomModel.findBySite(site)
const getRoomsByHotel = async (hotelId) => AccomodationsRoomModel.findSafe({hotel: hotelId})

const isClientDateBetweenRoomDates = (clientDate, roomDates) => {
    return _moment(clientDate).isBetween(roomDates.start, roomDates.end)
}

const getNumberOfNightsInPriceRange = (clientDates, roomDates) => {
    if (isClientDateBetweenRoomDates(clientDates.start, roomDates)) {
        if (isClientDateBetweenRoomDates(clientDates.end, roomDates)) {
            return _moment(clientDates.end).diff(_moment(clientDates.start), 'days')
        } else {
            return _moment(roomDates.end).diff(_moment(clientDates.start), 'days') + 1
        }
    }
    if (isClientDateBetweenRoomDates(clientDates.end, roomDates)) {
        return _moment(clientDates.end).diff(_moment(roomDates.start), 'days') + 1
    }

    return 0
}

// const addExtraFeesIfNeeded = (room, roomPrice, pax) => {
//     const {adult, child} = pax
//     if (adult + child > pax.maxPax) {
//         addExtraBeds()
//         addExtraBreakFasts()
//     }
// }

const getRoomPriceByDates = async (room, dates) => {
    const {name, _id} = room
    const roomWithPrice = {name, _id}

    roomWithPrice.price = room.prices.reduce(
        (acc, priceObj) => {
            const nightsInPriceRange = getNumberOfNightsInPriceRange(dates, priceObj)
            acc.amount += nightsInPriceRange * priceObj.amount
            acc.currency = priceObj.currency
            return acc
        },
        {amount: 0, currency: null}
    )
    //TODO: complete
    // await addExtraFeesIfNeeded(room, roomPrice, pax)

    return roomWithPrice
}

const getRoomsWithPrices = async (site, dates = {}, pax = {}) => {
    const {adult, child} = pax
    if (!adult && !child) {
        throw 'no pax'
    }

    const roomsByGroupSize = await AccomodationsRoomModel.findBySiteAndGroupSize(
        site,
        adult + child
    )

    return await Promise.all(roomsByGroupSize.map((room) => getRoomPriceByDates(room, dates)))
}

export default {
    init,
    getRoomsBySite,
    getRoomsWithPrices,
    getHotelsBySite,
    getRoomsByHotel,
}
