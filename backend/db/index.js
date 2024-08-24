import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const instance = await mongoose.connect(process.env.DB_URL);
    console.log(`Instance ${instance}`);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error.message);
  }
};
export { connectDB };
