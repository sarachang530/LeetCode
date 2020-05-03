/**
 * Given a string, determine if any of the permutations of that string is a palindrome
 * @see: Permutations: https://stattrek.com/statistics/dictionary.aspx?definition=permutation
 * @see: Palindromes: https://examples.yourdictionary.com/palindrome-examples.html
 *
 * In terms of time complexity, see if you can solve this in O(n) / linear time.
 * 
 * Example:
 * 	- permPalin('abab') => true
 * 	- permPalin('cbaba') => true
 * 	- permPalin('cbac') => false
 * 	- permPalin('a') => true
 *
 * Hint: Think about the length of the string and how that relates to the frequencies of the characters
*/

const permPalin = (string) => {
  if (!string) return true;
  if (typeof string !== 'string') return false;
​
  // solution is case-insensitive
  const lowerStr = string.toLowerCase();
​
  const charCounts = {};
  let oddCharCounts = 0;
​
  for (let i = 0; i < lowerStr.length; i++) {
    // count frequency of each character
    charCounts[lowerStr[i]] = charCounts[lowerStr[i]] + 1 || 1;
​
    // if char's frequency is odd, increment oddCharCounts
    if (charCounts[lowerStr[i]] % 2 !== 0) oddCharCounts += 1;
    else {
      // if char's frequency is even, decrement oddCharCounts
      // (frequencies must be odd before they can be even)
      oddCharCounts -= 1;
​
      // delete k-v pair for char -- we only care about odd counts
      // this mitigates space complexity, although worst-case remains linear
      // (could argue constant because there is a fixed number of characters in a given char set)
      delete charCounts[lowerStr[i]];
    }
  }
​
  // odd length strings can have 1 oddCharCount, even can have 0
  // if string length is even, impossible to have just 1 oddCharCount
  return oddCharCounts <= 1;
};


/* 
 * Extension: Solve in constant space complexity.
 */
/**
* 3. Storing frequency of characters in an integer (BigInt)
* 
* => Very similar implementation to permPalin, but achieves constant space
*    by using an integer to memoize the character frequencies.
* 
* - If string length is even, the bitVector should be 0.
* - If string length is odd, the bitVector should contain one bit of value 1
* 
* Time Complexity: O(n)
* Space Complexity: O(1)
* 
* Note: Use of BigInt included because JavaScript natively uses 53-bit integers,
* but to store frequencies of character codes 0-9, a-z, and A-Z, 
* we need to have at least 128 indices to work with => 'z'.charCodeAt() = 122
* BigInt's implementation allows for this headroom, but all operations and comparisons
* must be made by the same type, which is why numbers like 0n, 1n, and BigInt(x) are used.
*
* Further reading on bitwise operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
* Further reading on BigInt: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
*/


​const permPalinAdvanced = str => {
/**
 * toggles specific bit at index on the bitVector
 * 
 * @param {BigInt} bitVector 
 * @param {Integer} index 
 * 
 * toggle(0b1000, 3) => bitVector = 0
 * toggle(0, 3) => bitVector = 0b1000
 */
const toggle = (bitVector, index) => {
  // index out of bounds
  if (index < 0) return bitVector;
​
  // mask used for comparison against bitVector, detecting whether specific bit is 1 or not
  // index = 3, mask = 0b1000
  const mask = BigInt(1 << index);
​
  // if ANDing bitVector and mask results in 0, the specific bit at index will be set to 1
  // 0b1000 & 0b100 = 0 => bitVector = 0b1000 | 0b100 = 0b1100
  if ((bitVector & mask) === 0n) {
    bitVector = bitVector | mask
  }
  // else the specific bit on bitVector has a value of 1,
  // the bitVector is ANDed with the inverse of mask
  // if 0b10 & 0b10 = 0b10 then bitVector = 0b10 & 0b01 = 0
  else {
    bitVector = bitVector & ~mask
  }
​
  return bitVector;
}
​
// BigInt to handle bit indexes over 53
let bitVector = 0n;
​
const isStrLengthEven = str.length % 2 === 0;
​
// toggle on/off each character of the string using character codes
for (let i = 0; i < str.length; i++) {
  bitVector = toggle(bitVector, str[i].charCodeAt());
}
​
if (isStrLengthEven && bitVector === 0n) return true
// if bitVector = 0b1000 and bitVector - 1 = 0b111, ANDing them gives the result 0,
// indicating only one bit on the integer had a value of 1
// conversely, if bitVector = 0b1100 and bitVector - 1 = 0b1011, ANDing gives the result 0b1000,
// indicating more than one specific bit on bitVector had a value of 1
else if (!isStrLengthEven && ((bitVector & (bitVector - 1n)) === 0n)) return true
else return false
}
