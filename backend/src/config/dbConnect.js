import mongoose from "mongoose"

async function connectaNaDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING)

    return mongoose.connection;
}

export default connectaNaDatabase;