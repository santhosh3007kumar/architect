const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json()); // 🔥 important for POST

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
    console.error("DB connection failed ❌:", err);
  } else {
    console.log("Connected to RDS ✅");
  }
});

// ✅ HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ EXISTING API
app.get("/api", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DB Error ❌");
    }
    res.send("DB Connected: " + result[0]["NOW()"]);
  });
});

// 🔐 NEW LOGIN API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error ❌");
    }

    if (result.length > 0) {
      res.send("Login Successful ✅");
    } else {
      res.status(401).send("Invalid Credentials ❌");
    }
  });
});

app.listen(3000, () => console.log("Server running on port 3000 🚀"));