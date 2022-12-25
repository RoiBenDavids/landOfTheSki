/* eslint-disable max-lines-per-function */
// import {testAuthUser, testExpiredRecipient, testRecipient} from '#services/users/__test__/mock.js'
import {get, startTest, endTest} from '../../../common/__test__/testUtils.js'
import {queryParams, SITE} from './accomodations.test.mocks.js'
// import {
//     ERROR_DESCRIPTION_USER_MEMBER_OF_THE_ACCOUNT,
//     ERROR_DESCRIPTION_INVALID_ROLE,
// } from '#services/auth/auth.errors.js'
// import {ERROR_DESCRIPTION_USER_ALREADY_EXISTS} from '#services/users/users.errors.js'
// import {
//     ERROR_INVITE,
//     ERROR_DESCRIPTION_CANNOT_INVITE_YOURSELF,
//     ERROR_VERIFY_INVITE,
//     ERROR_DESCRIPTION_CANNOT_INVITE_HIGHER_RANK,
//     ERROR_DESCRIPTION_INVITE_NOT_FOUND,
//     ERROR_DELETE_INVITE,
// } from '../../invites.errors.js'
// import roles from '#services/users/constants/roles.js'
// import {generateTestTokens} from '#common/__test__/testTokens.js'
// import {checkInvite, extractTestInvites, invite} from '#services/invites/testUtils.js'
// import {testAccount, testSecondaryAccount} from '#services/accounts/__test__/mock.js'
// import {INVITE_STATUS_EXPIRED, INVITE_STATUS_PENDING} from '#services/invites/constants/statuses.js'

// await get(`/invites/verify/${inviteTestToken}`, 302)
// await post(
//     `/auth/signup/${inviteTestToken}`,
//     {
//         ...testRecipient,
//         token: inviteTestToken,
//     },
//     302
// )
describe('Invite API - Invite', () => {
    beforeAll(async () => {
        // await startTest()
    })
    afterAll(async () => {
        // await endTest()
    })
    SITE
    it('it should get rooms by price for correct pax and dates', async () => {
        const roomsWithPrices = await get(
            `/accommodations/rooms_with_prices/${SITE}`,
            200,
            queryParams
        )
        expect(roomsWithPrices).toBe('array')
    })
    it('it should not get rooms by price for correct pax and wrong dates', async () => {})

    it('it should not get rooms by price for wrong pax and coorect dates', async () => {})
    it('it should not get rooms by price for wrong pax and wrong dates', async () => {})
    it('it should not get rooms by price for wrong site', async () => {})
    it('it should not get rooms by site', async () => {})

    it('it should not get rooms by site for wrong site', async () => {})
})
