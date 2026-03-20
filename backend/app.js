const express = require("express");
const mysql = require("mysql2");

const app = express();

// 🔥 DB CONNECTION
const db = mysql.createConnection({
  host: "mydatabase.clois2q8u0s9.ap-southeast-1.rds.amazonaws.com",
  user: "santhosh",
  password: "Paathukaapu",
  database: "myappdb"
});

// Connect DB
db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

// API route
app.get("/api", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) return res.send("DB Error ❌");
    res.send("DB Connected: " + result[0]["NOW()"]);
  });
});

app.listen(3000, () => console.log("Server running"));