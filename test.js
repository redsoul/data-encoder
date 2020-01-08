const DataEncoder = require ('./');
const DataMappers = require ('./data-mappers');

const LinearBuckets = DataMappers.LinearBuckets;

const trainData = [
  {col1: 0, col2: 1},
  {col1: 2, col2: 2},
  {col1: 4, col2: 3},
  {col1: 7, col2: 4},
  {col1: 10, col2: 5},
  {col1: 4, col2: 6},
  {col1: 6, col2: 7},
];
const testData = [{col1: 8, col2: 6}, {col1: 10, col2: 7}];
const mapping = {
  col1: new LinearBuckets (3),
  col2: new LinearBuckets (2),
};

const dataEncoder = new DataEncoder ();
console.log (dataEncoder.fitTransform (trainData, mapping));
