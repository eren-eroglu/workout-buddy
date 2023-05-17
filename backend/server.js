require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
