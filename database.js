import mongoose from 'mongoose'
import log from './utils/logger'


mongoose.connect("mongodb://localhost/miotu-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => log.info('Database is connected'))
    .catch(error => log.error('Database problem conection : ', error))  
