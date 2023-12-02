import mongoose from "mongoose";

const connectToDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongoDb is connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDb;