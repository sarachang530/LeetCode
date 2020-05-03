/*
Given an array of at least two integers (which may be positive, negative, or zero),
return an array of all the possible products made by multiplying all but one number.
In other words, find all the products of multiplying any array.length - 1 numbers
in the array.
Example:
getAllProducts([1, 7, 3, 4]) -> [84, 12, 28, 21]
this is done via:
[7*3*4, 1*3*4, 1*7*4, 1*7*3]
getAllProducs([2, 5, 3]) -> [15, 6, 10]
this is done via:
[5*3, 2*3, 2*5]
Be careful in this problem! What if there is a zero (or multiple zeroes) in the
input array? How would you handle this?
*/
const getAllProducts = array => {
    let zeroCount = 0, prod = 1;
    let zeroIndex;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 0) {
        zeroCount++;
        zeroIndex = i;
        if (zeroCount === 2) break;
      }
      else {
        prod *= array[i];
      }
    }
    if (zeroCount === 0) {
      return array.map(ele => prod / ele);
    }
    else if (zeroCount === 1) {
      const result = new Array(array.length).fill(0);
      result[zeroIndex] = prod;
      return result;
    }
    else {
      return new Array(array.length).fill(0);
    }
  };
  module.exports = {getAllProducts};