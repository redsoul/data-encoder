const _ = require('lodash');
const DataMapper = require('./dataMapper');

class IntegerParser extends DataMapper {

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
        let integerArr = [];

        _.each(values, (value, index) => {
            if (isNaN(value)) {
                value = 0;
            }

            integerArr[index] = _.parseInt(value);
        });

        return {columns: [columnName], values: integerArr};
    }
}

module.exports = IntegerParser;