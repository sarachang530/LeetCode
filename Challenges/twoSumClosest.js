const twoSumClosest = (nums, target) => {
  nums.sort((a, b) => a - b);
  let closest = Infinity;
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (Math.abs(sum - target) < Math.abs(closest - target)) {
      closest = sum;
    }
    if (sum > target) {
      right -= 1;
    } else {
      left += 1;
    }
  }
  return closest;
};

console.log(twoSumClosest([3, 1, 4, 3], 6));
