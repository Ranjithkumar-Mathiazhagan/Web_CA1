const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://ranjithvoc32:ranjith@cluster0.fdvebg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Mongo DB Connected: ", conn.connection.host)
    }
    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB