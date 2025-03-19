import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("DB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default dbConnection;
