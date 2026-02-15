const express = require("express");
const session = require("express-session");
const svgCaptcha = require("svg-captcha");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "training-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));
app.use("/docs", express.static("docs"));

app.get("/api/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    background: "#f2f2f2",
  });

  req.session.captcha = captcha.text;
  res.type("svg");
  res.send(captcha.data);
});

app.post("/api/verify", (req, res) => {
  const { captcha, srNumber } = req.body;

  if (!captcha || captcha !== req.session.captcha) {
    return res.json({ success: false });
  }

  const documentUrl = `/docs/marriage_certificate_${srNumber}.pdf`;

res.json({
  success: true,
  documentUrl: documentUrl,
});

});

app.listen(3000, () => {
  console.log("Server running for https://e-sewa-punjabgovernment.com/");
});
