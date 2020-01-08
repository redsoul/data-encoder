const _ = require('lodash');
const CustomBuckets = require('./customBuckets');

class EqualLengthBuckets extends CustomBuckets {

    constructor(bucketCount) {
        super([]);
        this.bucketCount = bucketCount;
    }

    /**
     * @param values {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    fitTransform(values, columnName) {
        this.boundaries = _.chain(values)
            .uniq()
            .chunk(this.bucketCount)
            .map(value => value[1])
            .value();
        return this.transform(values, columnName);
    }

    /**
     * @param values {Array}
     * @param columnName {String}
     * @returns {Object}
     */
    transform(values, columnName) {
        return super.transform(values, columnName);
    }
}

module.exports = EqualLengthBuckets;