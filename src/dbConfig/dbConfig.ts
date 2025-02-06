import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("MongoDB successfully connected!");
    } catch (error:any) {
        console.error("Error in MongoConnection:", error.message);
    }
};

export default connect;
