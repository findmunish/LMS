const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(
    MONGODB_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    ()=> console.log('DB is connected!!')
)
