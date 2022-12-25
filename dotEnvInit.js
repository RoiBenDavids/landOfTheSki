let envPath = './.env'

//------------------------------------------------------------
// CHECK FOR COMMAND LINE ENV
//------------------------------------------------------------

process.argv.forEach((val, index) => {
    val === '-env' ? (envPath = process.argv[index + 1].toUpperCase()) : null
})
//------------------------------------------------------------

import dotenv from 'dotenv'
import loggerService from './common/helpers/logger.js'
dotenv.config({path: envPath})

loggerService.info('env = ' + envPath)
