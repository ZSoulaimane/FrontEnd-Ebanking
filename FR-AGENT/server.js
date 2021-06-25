const express = require("express");

const app = express();

app.use(express.static("./dist/Ebanking-agent-front"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/Ebanking-agent-front/" })
);

app.listen(process.env.PORT || 8080);
