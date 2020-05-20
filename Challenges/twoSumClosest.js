const twoSumClosest = (nums, target) => {

  // sort the array in order => [1, 3, 3, 4]
  nums.sort((a, b) => a - b);

  // representing our closest away from our target
  let closest = Infinity; 
  let left = 0; // left pointer
  let right = nums.length - 1; // right pointer 

  while (left < right) {
    // adding the two numbers at our current pointers
    const sum = nums[left] + nums[right];
    // if our sum is less than what our closest minus our target is then reassign closest
    if (Math.abs(sum - target) < Math.abs(closest - target)) {
      closest = sum;
    }
    // if our sum is GREATER than our target we will move our right down
    if (sum > target) {
      right -= 1;
    } else {
      // else we want to move our left up
      left += 1;
    }
  }
  return closest;
};

console.log(twoSumClosest([3, 1, 4, 3], 6));
