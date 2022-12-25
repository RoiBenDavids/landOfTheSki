import fs from 'fs'
import {parse} from 'csv-parse'

const readCSV = (path = './room-Sheet1.csv', from_line = 2) => {
    fs.createReadStream(path)
        .pipe(parse({delimiter: ',', from_line}))
        .on('data', function (row) {
            console.log({row})
        })
        .on('end', function () {
            console.log('finished')
        })
        .on('error', function (error) {
            console.log(error.message, 'error message')
        })
}

export default readCSV
