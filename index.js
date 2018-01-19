// compare two types checks
// options = { deep:'hasPart' }
// OR
// options = { deep:'hasOnly' }

class CompareObjects {

  constructor (ref, values, options) {
    this.ref = ref;
    this.values = values;
    this.options = options;
  }

 contain () {
    let valuePairs = null;
    if (typeof this.ref === 'object' &&
        typeof this.values === 'object' &&
        !Array.isArray(this.ref) &&
        !Array.isArray(this.values)) {

        valuePairs = this.values;
        // array of a given object's own enumerable properties
        this.values = Object.keys(this.values);
    }
    else {
        this.values = [].concat(this.values);
    }

    this.options = this.options || {};

    let compare;
    let compareFlags;

    const hasOnly = this.options.hasOwnProperty('only');
    const hasPart = this.options.hasOwnProperty('part');

    compare = (a, b) => a === b;
    let misses = false;
    const matches = new Array(this.values.length);
    for (let i = 0; i < matches.length; ++i) {
        matches[i] = 0;
    }

    if (typeof this.ref === 'string') {
        let pattern = '(';
        for (let i = 0; i < this.values.length; ++i) {
            const value = this.values[i];
            exports.assert(typeof value === 'string', 'Cannot compare string reference to non-string value');
            pattern += (i ? '|' : '') + exports.escapeRegex(value);
        }

        const regex = new RegExp(pattern + ')', 'g');
        const leftovers = this.ref.replace(regex, ($0, $1) => {

            const index = this.values.indexOf($1);
            ++matches[index];
             // Remove from string
            return '';
        });

        misses = !!leftovers;
    }
    else if (Array.isArray(this.ref)) {
        for (let i = 0; i < this.ref.length; ++i) {
            let matched = false;
            for (let j = 0; j < this.values.length && matched === false; ++j) {
                matched = compare(this.values[j], this.ref[i], compareFlags) && j;
            }

            if (matched !== false) {
                ++matches[matched];
            }
            else {
                misses = true;
            }
        }
    }
    else {
        const keys = Object.getOwnPropertyNames(this.ref);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            const pos = this.ref.indexOf(key);
            if (pos !== -1) {
                if (valuePairs &&
                    !compare(valuePairs[key], this.ref[key], compalags)) {

                    return false;
                }

                ++matches[pos];
            }
            else {
                misses = true;
            }
        }
    }

    let result = false;
    for (let i = 0; i < matches.length; ++i) {
        result = result || !!matches[i];
        if ((this.options.once && matches[i] > 1) ||
            (!this.options.part && !matches[i])) {

            return false;
        }
    }

    if (this.values.only &&
        misses) {

        return false;
    }

    return result;
 }
}

module.exports = CompareObjects;

//console.log(contain ([1,2,3], [1,4,3], {deep:'hasPart'}));
