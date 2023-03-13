const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const listRoutes = require("./routes/lists");
const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "https://netflixbystephenanokz.onrender.com",
      "https://adminnetflixbystephenanokz.onrender.com",
    ],
    credentials: true,
  })
);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("~DB Connection Successful~");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("strictQuery", false);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);

app.listen(port, () => {
  console.log(`****Backend Server Running on port ${port}****`);
});
