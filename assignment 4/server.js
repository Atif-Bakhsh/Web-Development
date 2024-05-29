const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const { connectDB } = require("./config/db");

// dotenv configuration
dotenv.config();

// DB connection
connectDB();

// rest object
const app = express();

app.set("view engine", "ejs");

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));

// routes
app.use("/api/v1/test", require("./routes/testRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/food", require("./routes/foodRoute"));
app.use("/api/v1/stats", require("./routes/statsRoute"));

// Welcome route
app.get("/", async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/api/v1/food/getAll`);
    const data = await response.json();
    res.render("index", { foods: data.foods });
  } catch (error) {
    res.status(500).send("Error fetching food items");
  }
});

// Render dashboard page
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Render orders page
app.get("/orders", (req, res) => {
  res.render("orders");
});

// Render products page
app.get("/products", (req, res) => {
  res.render("products");
});

// Render clients page
app.get("/clients", (req, res) => {
  res.render("clients");
});

// Render profile page
app.get("/profile", (req, res) => {
  res.render("profile");
});

// Render login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Render register page
app.get("/register", (req, res) => {
  res.render("register");
});

// PORT
const PORT = process.env.PORT || 4000;

// listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
