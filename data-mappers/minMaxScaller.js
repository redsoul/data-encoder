const DataMapper = require('./dataMapper');
const _ = require('lodash');
const ROUND_PRECISION = 8;

class MinMaxScaller extends DataMapper {

    constructor() {
        super();
        this.minMaxValues = {max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY};
    }

    /**
     * https://en.wikipedia.org/wiki/Feature_scaling
     * @param value {Number}
     * @param min {Number}
     * @param max {Number}
     * @param minRange {Number}
     * @param maxRange {Number}
     *
     * @returns {Number}
     */
    static featureScaling(value, min, max, minRange = -1, maxRange = 1) {
        if (min >= max) {
            throw new Error('Min value should be smaller than Max value');
        }

        if (minRange >= maxRange) {
            throw new Error('Min range should be smaller than Max range');
        }

        const normValue = minRange + (maxRange - minRange) * ((value - min) / (max - min));
        return _.round(normValue, ROUND_PRECISION);
    }

    /**
     * @param values {Array}
     * @returns {Object}
     */
    static calcMinMaxValues(values) {
        //init max and min values
        let minMaxValuesObj = {max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY};
        let chunks = _.chunk(values, 10000);

        _.each(chunks, function (chunkData) {
            _.each(chunkData, function (value) {
                if (isNaN(value)) {
                    return;
                }
                
                minMaxValuesObj.max = Math.max(minMaxValuesObj.max, value);
                minMaxValuesObj.min = Math.min(minMaxValuesObj.min, value);
            });
        });

        return minMaxValuesObj;
    }


    /**
     * @param values {Array}
     * @param columnName {String}
     * @param minRange {Number} Default -1
     * @param maxRange {Number} Default 1
     * */
    fitTransform(values, columnName, minRange = -1, maxRange = 1) {
        this.minMaxValues = MinMaxScaller.calcMinMaxValues(values);

        return this.transform(values, columnName, minRange, maxRange);
    }

    /**
     * @param values {Array}
     * @param columnName {String}
     * @param minRange {Number} Default -1
     * @param maxRange {Number} Default 1
     * */
    transform(values, columnName, minRange = -1, maxRange = 1) {
        let normalizedArr = [];
        _.each(values, (value, index) => {
            if (isNaN(value)) {
                value = 0;
            }

            normalizedArr[index] = MinMaxScaller.featureScaling(
                value,
                this.minMaxValues.min,
                this.minMaxValues.max,
                minRange,
                maxRange
            );
        });

        return {columns: [columnName], values: normalizedArr};
    }
}

module.exports = MinMaxScaller;