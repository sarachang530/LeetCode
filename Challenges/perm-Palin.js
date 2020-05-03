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


​
