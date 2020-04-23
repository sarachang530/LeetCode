/*
Determine whether a target substring can be found within a string!
No regex allowed! No string.prototype.includes or string.prototype.indexOf!
Your solution should have O(n * m) time-complexity where:
n is equal to the given string length
m is equal to the target substring length
I.e. in 'xztzcatbfbbq' find 'cat'
Input: 'xztzcatbfbbq', 'cat'
Output: true
Input: 'finding a needle in a haystack', 'lein'
Output: false
*/
/*
High level: slide the substring across the string, iterating by one, checking
if the current slice is the substring
Notables: the conditional range of the loop should be either:
  leftToRight + substring.length <= string.length
  OR
  leftToRight <= string.length - substring.length
  Using a for loop or while loop is more optimized because you can break early!
  You cannot break early out of array.prototype.forEach or other declarative ES6
  iterative methods
*/
const needleInHaystack = (fullString, subString) => {
  for (let leftToRight = 0; leftToRight + subString.length <= fullString.length; leftToRight += 1) {
    if (subString === fullString.slice(leftToRight, leftToRight + subString.length)) {
      return true;
    }
  }
  return false;
};
// console.log(needleInHaystack('xztzcatbfbbq', 'cat')); // true
// console.log(needleInHaystack('finding a needle in a haystack', 'lein')); // false
/*
Extension: Now imagine the target substring and string both might have underscores '_'.
Treat '_'s as wildcards, or blank pieces in Scrabble - i.e., they can be any letter.
Input: '_ello_orld', 'helloworl_'
Output: true
Input:'montana', '__o__'
Output: false
*/
/*
High level:
- Slide the substring across the string, but now - check if the string at that point
leftToRight at the index is the same as the substring at that index
OR
- check if the substring at that index has a wildcard
OR
- check if the string at that point leftToRight at the index is a wildcard
if every char of the string and substring match (even with a wildcard), return true
Notables: the outer loop should still be a for loop or while loop to break early, and
the inner loop should also be a for loop or while loop to break early
- meaning that the only time to return true is when the inner loop has fully iterated without breaking!
- i.e., when index === substring.length - 1, the inner loop will have checked the entire substring
- the current string character will always be leftToRight + index whereas
- the current substring character will just be at the index
*/
const needleInHaystackWithWildcards = (fullString, subString) => {
  for (let leftToRight = 0; leftToRight + subString.length <= fullString.length; leftToRight += 1) {
    for (let index = 0; index < subString.length; index += 1) {
      if (!(fullString[leftToRight + index] === subString[index] || subString[index] === '_' || fullString[leftToRight + index] === '_')) {
        break;
      }
      if (index === subString.length - 1) {
        return true;
      }
    }
  }
  return false;
};
// console.log(needleInHaystackWithWildcards('_ello_orld', 'helloworl_')); // true
// console.log(needleInHaystackWithWildcards('y_lo', '_o_')); // true
// console.log(needleInHaystackWithWildcards('montana', '__o_')); // false
module.exports = { needleInHaystack, needleInHaystackWithWildcards };