import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

    await connect(dbURI, {
      // serverSelectionTimeoutMS: 5000,
      dbName: "advanced-react",
      appName: "server",
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
