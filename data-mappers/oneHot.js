const _ = require('lodash');
const DataMapper = require('./dataMapper');

/**
 * https://en.wikipedia.org/wiki/One-hot
 */
class OneHot extends DataMapper {

    constructor() {
        super();
    }

    /**
     * @param data {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    fitTransform(data, columnName) {
        this.dictionary = _.uniq(data);
        return this.transform(data, columnName);
    }

    /**
     * @param data {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    transform(data, columnName) {
        const oneHotLength = this.dictionary.length;
        const oneHotData = [];
        let arr;

        _.each(data, (value) => {
            arr = _.fill(Array(oneHotLength), 0);
            arr[this.dictionary.indexOf(value)] = 1;
            oneHotData.push(arr);
        });

        return {
            columns: _.map(this.dictionary, (value) => columnName + '_' + value),
            values: oneHotData
        };
    }
}

module.exports = OneHot;