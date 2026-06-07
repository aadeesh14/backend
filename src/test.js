import mongoose from "mongoose";

try {
  const conn = await mongoose.connect(
    "mongodb+srv://Aadeesh:aadeeshjain123@cluster0.6d96yo7.mongodb.net/test"
  );

  console.log("Connected:", conn.connection.host);
} catch (err) {
  console.error(err);
}