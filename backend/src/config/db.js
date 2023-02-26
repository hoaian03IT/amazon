import mongoose from "mongoose";

export const connectToDB = () => {
    try {
        mongoose.set("strictQuery", false);

        const URL = process.env.MONGODB_URL;
        mongoose.connect(URL);
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect failed!");
    }
};
