/*Jump Game
The Problem
Given an array of non-negative integers, you are initially positioned at the first index of the array. Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

Example #1

Input: [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example #2

Input: [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum
             jump length is 0, which makes it impossible to reach the last index.
*/


/**
 * GREEDY approach of solving Jump Game.
 *
 * This comes out as an optimisation of DYNAMIC PROGRAMMING BOTTOM_UP approach.
 *
 * Once we have our code in the bottom-up state, we can make one final,
 * important observation. From a given position, when we try to see if
 * we can jump to a GOOD position, we only ever use one - the first one.
 * In other words, the left-most one. If we keep track of this left-most
 * GOOD position as a separate variable, we can avoid searching for it
 * in the array. Not only that, but we can stop using the array altogether.
 *
 * We call a position in the array a "good" one if starting at that
 * position, we can reach the last index. Otherwise, that index
 * is called a "bad" one.
 *
 * @param {number[]} numbers - array of possible jump length.
 * @return {boolean}
 */
export default function greedyJumpGame(numbers) {
  // The "good" cell is a cell from which we may jump to the last cell of the numbers array.

  // The last cell in numbers array is for sure the "good" one since it is our goal to reach.
  let leftGoodPosition = numbers.length - 1;

  // Go through all numbers from right to left.
  for (let numberIndex = numbers.length - 2; numberIndex >= 0; numberIndex -= 1) {
    // If we can reach the "good" cell from the current one then for sure the current
    // one is also "good". Since after all we'll be able to reach the end of the array
    // from it.
    const maxCurrentJumpLength = numberIndex + numbers[numberIndex];
    if (maxCurrentJumpLength >= leftGoodPosition) {
      leftGoodPosition = numberIndex;
    }
  }

  // If the most left "good" position is the zero's one then we may say that it IS
  // possible jump to the end of the array from the first cell;
  return leftGoodPosition === 0;
}
