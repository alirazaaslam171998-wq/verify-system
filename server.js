const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const svgCaptcha = require("svg-captcha");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "verify-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// Load documents registry
const documents = JSON.parse(
  fs.readFileSync(path.join(__dirname, "documents.json"), "utf8")
);

// 🔐 CAPTCHA ROUTE
app.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: "#f2f2f2",
  });

  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
});

// 🔍 VERIFY ROUTE
app.post("/verify", (req, res) => {
  const { serial, captcha } = req.body;

  if (!serial || !captcha) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (captcha.toLowerCase() !== req.session.captcha?.toLowerCase()) {
    return res.status(401).json({ error: "Invalid captcha" });
  }

  const record = documents[serial];

  if (!record) {
    return res.status(404).json({ error: "Invalid Serial Number" });
  }

  res.json({
    success: true,
    file: record.file,
    name: record.displayName,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
