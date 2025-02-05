const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userroute = require("./routes/useroute");
const bookrout = require("./routes/bookroute");
const reviewroute = require("./routes/reviewroute");
const { error } = require("console");

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());  // Enable CORS for all requests

// Routes
app.use("/api/users", userroute); // User routes
app.use("/api/books", bookroute); // Book routes
app.use("/api/reviews", reviewroute); // Review routes

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/secondhandbooks").then(()=>{
    console.log("connected succesfully");

  })
  .catch((error)=>{
    console.log("error",error);
  });
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
