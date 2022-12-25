import supertest from 'supertest'
import app from '../../index.js'

export const request = supertest.agent(app)
const baseApiPath = '/api/v1'

const doRequest = async (method, path, body, expect, query = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        'log-errors': 'false',
        isTest: true,
    }
    console.log({baseApiPath, path}, 'doR equest')
    const req = request[method](`${baseApiPath}${path}`).query(query).set(headers)
    if (body) {
        req.send(body)
    }
    if (expect) {
        req.expect(expect)
    }

    return handleResponse(await req)
}

const handleResponse = (res) => res.body.data

export const get = (path, expect, query) => doRequest('get', path, null, expect, query)
export const post = (path, body, expect, query) => doRequest('post', path, body, expect, query)
export const put = (path, body, expect, query) => doRequest('put', path, body, expect, query)
export const del = (path, body, expect, query) => doRequest('del', path, body, expect, query)

export const clearTestData = async () => {
    await get('/tests/clearTestData')
}

export const startTest = async () => {
    await clearTestData()
}

export const endTest = async () => {
    await clearTestData()
}

export const verifyError = (errorBody, expectedError, expectedMessage) => {
    const {
        body: {error, message},
    } = errorBody

    expect(error).toEqual(expectedError)
    if (expectedMessage) {
        expect(message).toEqual(expectedMessage)
    }
}
