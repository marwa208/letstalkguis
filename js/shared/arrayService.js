/**
 * Shuffles an array by randomly change their sequence.
 * @param {Array} array The array to be shuffled.
 * @returns {Array} The array after being shuffled.
 */
function shuffleArray(array) {
    var j, temp;
    for (var i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Checks if the given array contains the given value or not.
 * @param {Array} array The array to search into.
 * @param {any} value The value to search for.
 * @returns {boolean} A boolean value indicating whether the array contains the value or not.
 */
function includes(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value)
            return true;
    }
    return false;
}

/**
 * Creates a sequence of numbers based on start, end and step.
 * @param {number} start The start value.
 * @param {number} end The end value.
 * @param {number} step The increasing step value.
 * @returns {Array} The squence of numbers.
 */
function createSequence(start, end, step) {
    if (end < start)
        return null;
    var seq = [];
    for (var i = start; i <= end; i += step) {
        seq.push(i);
    }
    return seq;
}

/**
 * Adds n random values to array from a range of random values starting by 0.
 * @param {Array} array The array to be filled.
 * @param {number} count The count of random range.
 * @param {number} maxRandomNumber The max random value range.
 * @returns {Array} Adds the ragne to the array.
 */
function addFromRange(array, count, maxRandomNumber) {
    var rand;
    for (var i = 0; i < count; i++) {
        while (true) {
            rand = Math.floor((Math.random() * maxRandomNumber) + 1);
            if (!includes(array, rand)) {
                array.push(rand);
                break;
            }
        }
    }
    return array;
}