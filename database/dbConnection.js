import mongoose from "mongoose";

export const dbConnection = async () => {

    const uri = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    try {
        await mongoose.connect(uri, {
            dbName: dbName,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database");
    } catch (error) {
        console.log("Error occurred while connecting to database", error);
    }
};