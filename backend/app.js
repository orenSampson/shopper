const express = require("express");

const app = express();

let csvData = require("fs").readFileSync("data.csv", "utf8");

csvData = csvData.split("\r\n");

for (let i = 1; i < csvData.length; i++) {
  csvData[i] = csvData[i].split(",");
}

csvData.shift();

console.log(csvData);

// app start configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Running on port " + PORT);
});
