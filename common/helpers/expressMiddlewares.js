import logger from './logger.js'

export const responseHandler = (req, res, next) => {
    res.handle = async function (action, functionName) {
        try {
            const response = await action()
            if (response) {
                return res.status(200).json({data: response})
            }
            throw new Error('no response')
        } catch (err) {
            logger.error({action, err}, functionName)
            return next(err)
        }
    }
    console.log('')
    next()
}

export const errorResponder = (error, req, res) => {
    const status = error.status || 500
    res.status(status).send({error: error.message})
}

export const inValidPathHAndler = (req, res) => {
    res.status(404).send({error: 'invalid path'})
}

export const serilizeQuery = (req, res, next) => {
    if (req.query.skiDays) {
        req.query.skiDays = parseInt(req.query.skiDays)
    }
    if (req.query.pax) {
        req.query.pax.adult = parseInt(req.query.pax.adult)
        req.query.pax.child = parseInt(req.query.pax.child)
    }
    next()
}
