import mongoose from "mongoose";
// To load the models to the app the first time
import User from "@/models/user";
import Board from "@/models/board";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("❌ Mongoose Error " + error.message);
  }
};

export default connectMongo;
