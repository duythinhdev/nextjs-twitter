import mongoose from "mongoose";
import ProcessEnv = NodeJS.ProcessEnv;

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    const {MONGODB_URI} = process.env as ProcessEnv;
    if (MONGODB_URI != null) {
        await mongoose.connect(MONGODB_URI);
    }
}