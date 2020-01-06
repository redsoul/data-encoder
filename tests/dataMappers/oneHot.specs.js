describe('OneHot encoder', function () {
    const OneHot = require(MODULE_PATH).DataMappers.OneHot;
    let oneHot;

    beforeEach(function () {
        oneHot = new OneHot();
    });

    describe('fitTransform', function () {
        test('should encode into a one hot array', function () {
            expect(oneHot.fitTransform([1, 2], '')).toEqual({
                columns: ['_1', '_2'],
                values: [[1, 0], [0, 1]]
            });
            expect(oneHot.fitTransform([1, 2, 3], '')).toEqual({
                columns: ['_1', '_2', '_3'],
                values: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            });
            expect(oneHot.fitTransform(['a', 'b', 'c', 'd'], '')).toEqual({
                columns: ['_a', '_b', '_c', '_d'],
                values: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
            });
            expect(oneHot.fitTransform(['a', 'b', 'a', 'b', 'c', 'd'], '')).toEqual({
                columns: ['_a', '_b', '_c', '_d'],
                values: [[1, 0, 0, 0], [0, 1, 0, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
            });
        });
    });
});