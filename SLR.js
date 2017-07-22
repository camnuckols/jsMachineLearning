const SLR = require('ml-regression').SLR;
const csv = require('csvtojson');
const readLine = require('readline');

const csvFilePath = 'advertising.csv';  // the data
let csvData = [];                       // parsed data
let x = [];                             // Input
let y = [];                             // Output

let regressionModel;

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

csv().fromFile(csvFilePath)
.on('json', (jsonObj) => {
  csvData.push(jsonObj);
})
.on('done', () => {
  dressData();                          // To get data points, from JSON objects
  performRegression();
});

function dressData() {
  csvData.forEach(row => {
    x.push(parseFloat(row.Radio));
    y.push(parseFloat(row.Sales));
  })
}

function performRegression() {
  regressionModel = new SLR(x, y);      // Train the model on training data
  console.log(regressionModel.toString(3));
  predictOutput();
}

function predictOutput() {
  rl.question('Enter input x for prediction (press CTRL + C to exit) :', (answer) => {
    console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
    predictOutput();
  })
}