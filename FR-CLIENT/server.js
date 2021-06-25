const express = require("express");

const app = express();

app.use(express.static("./dist/Ebanking-client-front"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/Ebanking-client-front/" })
);

app.listen(process.env.PORT || 8080);
