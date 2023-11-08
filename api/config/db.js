const moongose = require("mongoose");

// const URL = `mongodb+srv://${process.env.MONGO_URI}`
const connectDB = async () => {
  try {
    // console.log(`Mongo URI: ${process.env.MONGO_URL}`)
    const conn = await moongose.connect(
      `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
