/*
You are given an array of integers and a target number. Write a function that
returns the smallest absolute difference of the closest subset sum to the
target. A subset can be any size and the elements do not have to appear
consecutively in the array.
Positive, negative, and zero allowed. Some numbers may be duplicated.
subsetSumClosest([3, 7, 8, 2], 5) -> 0
Because 3 + 2 -> 5 exactly, the difference between the closest sum and the target
is 5 - 5 = 0.
subsetSumClosest([3, 7, 8, 2], 6) -> 1
The closest subset sum to 6 is either 7 -> 7, or 3 + 2 -> 5. Either of these has
an absolute difference from the target of 1.
subsetSumClosest([1, -3, 2], 5) -> 2
The closest subset sum to 5 is 1 + 2 -> 3, which has an absolute difference
from the target of 2.
subsetSumClosest([], 6) -> 6
An empty array "sums" to 0, which has an absolute difference from the target 6
of 6.
*/

const subsetSumClosest = (nums, target) => {
  let minDifference = Infinity;
  const process = (updatedTarget, index) => {
    if (index === nums.length) {
      minDifference = Math.min(minDifference, Math.abs(updatedTarget));
      return;
    }
    process(updatedTarget - nums[index], index + 1);
    process(updatedTarget, index + 1);
  };
  process(target, 0);
  return minDifference;
};
console.log(subsetSumClosest([3, 7, 8, 2], 6));
console.log(subsetSumClosest([1, -3, 2], 5));
console.log(subsetSumClosest([], 6));