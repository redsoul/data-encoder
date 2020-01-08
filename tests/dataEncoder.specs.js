describe ('DataEncoder', () => {
  const DataEncoder = require (MODULE_PATH);
  const DataMappers = require (DATAMAPPER_PATH);

  const OneHot = DataMappers.OneHot;
  const MinMaxScaller = DataMappers.MinMaxScaller;
  const CustomBuckets = DataMappers.CustomBuckets;
  const EqualLengthBuckets = DataMappers.EqualLengthBuckets;
  const LinearBuckets = DataMappers.LinearBuckets;
  const FloatParser = DataMappers.FloatParser;
  const IntegerParser = DataMappers.IntegerParser;

    beforeEach(function () {

    });

    describe('one hot encode/decode', function () {

        beforeEach(function () {
        });

        test('should encode into a one hot array', function () {
            const trainData = [
                {col1: 'a', col2: 1, col3: 0, col4: 0, col5: 1, col6: 1, col7: 1, col8: '1', col9: '1.0'},
                {col1: 'b', col2: 2, col3: 2, col4: 5, col5: 2, col6: 2, col7: 2, col8: 1, col9: 'a'},
                {col1: 'c', col2: 3, col3: 3, col4: 8, col5: 3, col6: 3, col7: 3, col8: '1.12345', col9: 1.12345},
                {col1: 'a', col2: 2, col3: 1, col4: 15, col5: 5, col6: 5, col7: 5, col8: 'a', col9: 1.1},
                {col1: 'a', col2: 2, col3: 1, col4: 'a', col5: 5, col6: 5, col7: 5, col8: 0.01e1, col9: 10e1}
            ];
            const testData = [
                {col1: 'c', col2: 1, col3: 4, col4: -3, col5: 4, col6: 4, col7: 4, col8: '.1', col9: '.1'},
                {col1: 'b', col2: 3, col3: 2, col4: 16, col5: 6, col6: 6, col7: 6, col8: .5, col9: .5},
            ];
            const mapping = {
                'col1': new OneHot(),
                'col3': new OneHot(),
                'col4': new MinMaxScaller(),
                'col5': new CustomBuckets([2, 4]),
                'col6': new EqualLengthBuckets(2),
                'col7': new LinearBuckets(2),
                'col8': new FloatParser(),
                'col9': new IntegerParser(),
            };
            const dataEncoder = new DataEncoder();
            const encodedTrainData = dataEncoder.fitTransform(trainData, mapping);

            expect(encodedTrainData.values.length).toEqual(trainData.length);
            expect(encodedTrainData.columns).toEqual(
                ['col1_a', 'col1_b', 'col1_c', 'col3_0', 'col3_2', 'col3_3', 'col3_1', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col2']
            );
            expect(encodedTrainData.values[0]).toEqual([1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 1, 1, 1]);
            expect(encodedTrainData.values[1]).toEqual([0, 1, 0, 0, 1, 0, 0, -0.33333333, 1, 1, 1, 1, 0, 2]);
            expect(encodedTrainData.values[2]).toEqual([0, 0, 1, 0, 0, 1, 0, 0.06666667, 1, 1, 1, 1.12345, 1, 3]);
            expect(encodedTrainData.values[3]).toEqual([1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 0, 1, 2]);
            expect(encodedTrainData.values[4]).toEqual([1, 0, 0, 0, 0, 0, 1, -1, 2, 2, 2, 0.1, 100, 2]);

            const encodedTestData = dataEncoder.transform(testData, mapping);
            expect(encodedTestData.values.length).toEqual(testData.length);
            expect(encodedTestData.columns).toEqual(
                ['col1_a', 'col1_b', 'col1_c', 'col3_0', 'col3_2', 'col3_3', 'col3_1', 'col4', 'col5', 'col6', 'col7', 'col8', 'col9', 'col2']
            );
            expect(encodedTestData.values[0]).toEqual([0, 0, 1, 0, 0, 0, 0, -1.4, 2, 1, 1, 0.1, NaN, 1]);
            expect(encodedTestData.values[1]).toEqual([0, 1, 0, 0, 1, 0, 0, 1.13333333, 2, 2, 2, 0.5, 0, 3]);
        });
    });
});