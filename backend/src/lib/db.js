import mongoose from "mongoose";


export async function connectDB(){
    try {
        const mongoUri = process.env.MONGO_URI || process.env.DB_URI
        if (!mongoUri) {
            throw new Error("MONGO_URI or DB_URI is required")
        }
        const conn = await mongoose.connect(mongoUri)
        console.log("mongodb connection success", conn.connection.host)
    }
    catch (error) {
        console.error("mongodb connection error ", error.message);
        process.exit(1)
    }
}