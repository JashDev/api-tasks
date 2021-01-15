const mongoose = require('mongoose')
require('dotenv').config({
    path: '.env'
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('DB connect')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connect