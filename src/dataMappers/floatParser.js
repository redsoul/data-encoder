const _ = require('lodash');
const DataMapper = require('./dataMapper');

class FloatParser extends DataMapper {

    constructor() {
        super();
    }

    /**
     * @param values {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    fitTransform(values, columnName) {
        return this.transform(values, columnName);
    }

    /**
     * @param values {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    transform(values, columnName) {
        let floatArr = [];

        _.each(values, (value, index) => {
            if (isNaN(value)) {
                value = 0.0;
            }

            floatArr[index] = parseFloat(value);
        });

        return {columns: [columnName], values: floatArr};
    }
}

module.exports = FloatParser;