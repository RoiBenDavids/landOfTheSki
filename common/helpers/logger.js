import bunyan from 'bunyan'
import bformat from 'bunyan-format'
const formatOut = bformat({outputMode: 'long', color: true})
import colors from 'colors'

const streams = [
    {
        stream: formatOut,
        level: process.env.DEBUG_LEVEL || 'Info',
        color: true,
    },
]

if (process.env.LOG_FILE) {
    streams.push({
        path: __dirname + process.env.LOG_FILE,
        level: 'trace',
    })
}

const log = bunyan.createLogger({
    name: 'HYGear_api_server',
    streams,
    serializers: bunyan.stdSerializers,
})

const debug = (obj, msg) => {
    log.debug(colors.gray(obj), msg || '')
}

const info = (obj, msg) => {
    log.info(colors.white(obj), msg || '')
}

const warn = (obj, msg) => {
    log.warn(colors.yellow(obj), msg || '')
}

const error = (obj, msg) => {
    log.error(colors.red(obj), msg || '')
}

export default {
    debug,
    warn,
    error,
    info,
}
