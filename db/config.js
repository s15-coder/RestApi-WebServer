const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_DB)
        console.log('Connected to DB');
    } catch (error) {
        throw new Error(`Could not con nect to DB: ${error}`)
    }
   
}

module.exports = {
    connectDB
}