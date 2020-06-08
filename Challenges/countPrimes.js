/*
Count the number of prime numbers less than a non-negative number, n.

Example:

Input: 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
*/

/**
 * @param {number} n
 * @return {number}
 */
let countPrimes = function(n) {
  let primes = [];
  let primeCount = 0;

  for (let i = 0; i < n; i++) {
    primes.push(true);
  }

  for (let i = 2; i * i < primes.length; i++) {
    if (primes[i]) {
      for (let j = i; j * i < primes.length; j++) {
        primes[i * j] = false;
      }
    }
  }

  for (let i = 2; i < primes.length; i++) {
    if (primes[i]) {
      primeCount++;
    }
  }

  return primeCount;
}