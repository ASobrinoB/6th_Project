const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("*** Conectado a la base de datos con exito ***")
        console.log(process.env.MONGODB_URI)
    } catch (error) {
        console.log("*** ERROR al intentar conectarse a la base de datos ***")
        console.log(process.env.MONGODB_URI)
        console.log(error)
        process.exit(1)
}

module.exports = connectDB