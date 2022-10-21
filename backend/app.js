const express = require("express");

const app = express();

// app start configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Running on port " + PORT);
});
