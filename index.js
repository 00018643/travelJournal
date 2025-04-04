// index.js
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoutes = require('./routes/userRoutes');
const app = express();

const notesRoutes = require("./routes/travelnotesRoutes");
const authRoutes = require("./routes/authenticationRoutes");

const requireAuth = require("./middleware/requireAuth");
const redirectIfAuth = require("./middleware/redirectAuth");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.redirect('/notes')
});

app.use("/notes", requireAuth, notesRoutes);
app.use('/profile', requireAuth, userRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});