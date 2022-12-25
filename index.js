import {
    responseHandler,
    errorResponder,
    inValidPathHAndler,
} from './common/helpers/expressMiddlewares.js'
import bodyParser from 'body-parser'
import express from 'express'
import './dotEnvInit.js'
import cors from 'cors'
import init from './common/helpers/init.js'
import logger from './common/helpers/logger.js'
const app = express()

import router from './router/v1/index.js'

const port = process.env.PORT

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(responseHandler)
app.use(cors())

init.run()

// app.use(express.static(path.join(__dirname, "public")));

app.use('/', (req, res, next) => {
    const {query, params, path} = req
    console.log({query, params, path}, 'REQUEST')
    next()
})
app.use('/api/v1', router)

app.use(inValidPathHAndler)
app.use(errorResponder)

app.listen(port, () => {
    logger.info(`Land Of The Ski is listening at http://localhost:${port}`)
})
export default app
