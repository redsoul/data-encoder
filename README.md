# data-encoder
https://www.npmjs.com/package/data-encoder

Inspired by Pandas and sklearn.preprocessing libraries from Python, this package aims to provide data encoding options, useful in data-science and machine learning projects.

Full documentation and source code - https://github.com/redsoul/data-encoder

## Installation

    npm install data-encoder --save

## Usage and Examples

```javascript
    const DataEncoder = require('data-encoder');
    const DataMappers = require('data-encoder/data-mappers');
```

### One Hot
https://en.wikipedia.org/wiki/One-hot

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
https://en.wikipedia.org/wiki/Feature_scaling

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

### Integer and Float Parser
```javascript
    const IntegerParser = DataMappers.IntegerParser;
    const FloatParser = DataMappers.FloatParser;

    const trainData = [
        {col1: '1.0001', col2: '1.0001'},
        {col1: 123.1234, col2: 123.1234},
        {col1: 10e1, col2: 0.1e1},
    ];
    const mapping = {
        col1: new IntegerParser (),
        col2: new FloatParser (),
    };

    const dataEncoder = new DataEncoder ();
    console.log (dataEncoder.fitTransform (trainData, mapping));
    /*
    {
        columns: [ 'col1', 'col2' ],
        values: [ [ 1, 1.0001 ], [ 123, 123.1234 ], [ 100, 1 ] ]
    }
    */
```

### Custom Buckets

Buckets with custom boundaries

```javascript
    const CustomBuckets = DataMappers.CustomBuckets;

    const trainData = [
        {col1: 0, col2: 1},
        {col1: 3, col2: 2},
        {col1: 4, col2: 3},
        {col1: 7, col2: 4},
    ];
    const testData = [
        {col1: 8, col2: 6}, 
        {col1: 10, col2: 7}
    ];
    const mapping = {
        col1: new CustomBuckets([4, 6, 8]),
    };

    const dataEncoder = new DataEncoder ();
    console.log (dataEncoder.fitTransform (trainData, mapping));
    /*
    {
        columns: [ 'col1', 'col2' ],
        values: [ [ 0, 1 ], [ 0, 2 ], [ 1, 3 ], [ 2, 4 ] ]
    }
    */
    console.log (dataEncoder.transform (testData, mapping));
    /*
    { 
        columns: [ 'col1', 'col2' ], 
        values: [ [ 3, 6 ], [ 3, 7 ] ] 
    }
    */
```

### Equal Length Buckets
Put numbers into buckets that have equal-length ranges.

```javascript
    const EqualLengthBuckets = DataMappers.EqualLengthBuckets;

    const trainData = [
        {col1: 0, col2: 1},
        {col1: 2, col2: 2},
        {col1: 4, col2: 3},
        {col1: 7, col2: 4},
        {col1: 10, col2: 5},
        {col1: 4, col2: 6},
        {col1: 6, col2: 7},
    ];
    const testData = [
        {col1: 8, col2: 6}, 
        {col1: 10, col2: 7}
    ];
    const mapping = {
        col1: new EqualLengthBuckets(3),
        col2: new EqualLengthBuckets(2),
    };

    const dataEncoder = new DataEncoder ();
    console.log (dataEncoder.fitTransform (trainData, mapping));
    /*
        {
            columns: [ 'col1', 'col2' ],
            values: [
                [ 0, 0 ], [ 1, 1 ],
                [ 1, 1 ], [ 1, 2 ],
                [ 2, 2 ], [ 1, 4 ],
                [ 1, 4 ]
            ]
        }
    */
    console.log (dataEncoder.transform (testData, mapping));
    /*
        { 
            columns: [ 'col1', 'col2' ], 
            values: [ [ 1, 4 ], [ 2, 4 ] ] 
        }
    */
```

### Linear Buckets
Put numbers into buckets that have equal-size ranges.

```javascript
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
    const mapping = {
        col1: new LinearBuckets (3),
        col2: new LinearBuckets (2),
    };

    const dataEncoder = new DataEncoder ();
    console.log (dataEncoder.fitTransform (trainData, mapping));
```
