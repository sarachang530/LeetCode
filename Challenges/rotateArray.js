//https://leetcode.com/problems/rotate-array/
/*
189. Rotate Array
Easy

2255

753

Add to List

Share
Given an array, rotate the array to the right by k steps, where k is non-negative.

Example 1:

Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
Note:

Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?

*/

//// PROBLEM ////
/**
* Given an array, rotate the array to the right by k steps, where k is non-negative.
* Input: [1,2,3,4,5,6,7] and k = 3
* Output: [5,6,7,1,2,3,4]
*/
//// SOLUTION ////
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // GOAL: Rotate an array to the right by 'k' steps
    // Splice out the values at the end of the array 
    // Store them in a variable
    // Use unshift to move them into the beginning of the array
    
    const elements = nums.splice(nums.length-k);
    nums.unshift(...elements)
};