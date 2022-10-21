const readCSVFile = () => {
  let csvData = require("fs").readFileSync("data.csv", "utf8");

  csvData = csvData.split("\r\n");

  for (let i = 1; i < csvData.length; i++) {
    csvData[i] = csvData[i].split(",");
  }

  csvData.shift();

  return csvData;
};

module.exports = { readCSVFile };
