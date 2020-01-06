# data-encoder
https://www.npmjs.com/package/data-encoder

Inspired by Pandas and sklearn.preprocessing libraries from Python, this package aims to provide data encoding options, useful in data-science and machine learning projects.

Full documentation and source code - https://github.com/redsoul/data-encoder

## Installation

    npm install data-encoder --save

## Usage and Examples

```javascript
    const DataEncoder = require('data-encoder').DataEncoder;
    const DataMappers = require('data-encoder').DataMappers;
```

### One Hot
```javascript
    const OneHot = DataMappers.OneHot;

    const trainData = [
        {col1: 'a', col2: 1},
        {col1: 'b', col2: 2},
        {col1: 'c', col2: 3},
        {col1: 'a', col2: 4},
    ];
    const testData = [
        {col1: 'b', col2: 5},
    ];
    const mapping = {
        'col1': new OneHot(),
    }

    const dataEncoder = new DataEncoder();
    console.log(dataEncoder.fitTransform(trainData, mapping));
    /*
    {
        columns: [ 'col1_a', 'col1_b', 'col1_c', 'col2' ],
        values: [ [ 1, 0, 0, 1 ], [ 0, 1, 0, 2 ], [ 0, 0, 1, 3 ], [ 1, 0, 0, 4 ] ]
    }
    */

    console.log(dataEncoder.transform(testData, mapping));
    /*
    {
        columns: [ 'col1_a', 'col1_b', 'col1_c', 'col2' ],
        values: [ [ 0, 1, 0, 5 ] ]
    }
    */
```

### Min-Max Scaller
```javascript
    const MinMaxScaller = DataMappers.MinMaxScaller;

    const trainData = [
        {col1: 0, col2: 1},
        {col1: 5, col2: 2},
        {col1: 8, col2: 3},
        {col1: 15, col2: 4},
    ];
    const testData = [
        {col1: -3, col2: 6}, 
        {col1: 16, col2: 7}
    ];
    const mapping = {
        col1: new MinMaxScaller(),
    };

    const dataEncoder = new DataEncoder();
    console.log (dataEncoder.fitTransform (trainData, mapping));
    /*
    {
        columns: [ 'col1', 'col2' ],
        values: [ [ -1, 1 ], [ -0.33333333, 2 ], [ 0.06666667, 3 ], [ 1, 4 ] ]
    }
    */
    console.log (dataEncoder.transform (testData, mapping));
    /*
    {
        columns: [ 'col1', 'col2' ],
        values: [ [ -1.4, 6 ], [ 1.13333333, 7 ] ]
    }
    */
```

### Integer Parser
```javascript
    const IntegerParser = DataMappers.IntegerParser;

    const trainData = [
        {col1: '1.0001', col2: 1},
        {col1: 123.1234, col2: 3},
        {col1: 10e1, col2: 4},
    ];
    const mapping = {
        col1: new IntegerParser(),
    };

    const dataEncoder = new DataEncoder();
    console.log (dataEncoder.transform(trainData, mapping));
    /*
    {
        columns: [ 'col1', 'col2' ],
        values: [ [ 1, 1 ], [ 123, 3 ], [ 100, 4 ] ]
    }
    */
```
