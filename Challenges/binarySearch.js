// https://leetcode.com/problems/search-in-rotated-sorted-array/discuss/535104/JavaScript-Binary-Search-1-pass-and-2-pass


// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
​
// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
​
// You are given a target value to search. If found in the array return its index, otherwise return -1.
​
// You may assume no duplicate exists in the array.
​
// Your algorithm's runtime complexity must be in the order of O(log n).
​
                            /* COMMENTED SOLUTIONS */
​
/* To do this in logarithmic time, we need to use binary search (dividing up the array into halves so that we have
 at most log base 2 the length of the array operation -- we only have to divide into halves at most X times, for 
 2^X = length -- i.e. X = log(base 2).
​
The problem is the "pivot," where the array is kept sorted in ascending order, but the start is moved randomly into
the middle of the array, and then the array just wraps back around. The given example is [0,1,2,4,5,6,7] "pivoting" 
to become [4,5,6,7,0,1,2]. Here the pivot point is 0 moving from index 0 to index 4.
​
The two pass solution, which is logarithmic -- O(2log n) is functionally equivalent in most circumstances to O(log n)
-- is to first find the pivot point using a binary search and then find the minimum on the correct half using another
binary search. */
​
const twoPassSearch = (nums, target) => {
​
    // First we declare variables to manipulate the high, low, and middle indices of the subsection of the array we
    // are working on as we divide down in the binary search.
​
    let low = 0;
    let high = nums.length - 1;
    let mid;
​
    /* First we find the pivot point, which we can find by the fact that it will be the *only* point
    in the otherwise strictly-increasing array where the value at index i will be *less* than 
    the value at index i - 1 (and if this doesn't exist, the pivot index is simply 0, i.e. the array wasn't 
    actually moved). In the case of the example array above, [4,5,6,7,0,1,2] , index 4 is the pivot because we go
    from a value of 7 down to a value of 0.
    */
​
    let pivot = 0;
​
    while (low <= high) {                // We use this while conditional because we will either find the pivot in the 
                                        // middle -- or if we keep dividing the array in half and either increasing the low
                                        // or descreasing the high -- we will get to low > high, which will stop the loop
                                        // and we will default to pivot = 0, which we have already initialized.
​
        mid = (low + high) >>> 1;           // See footnotes for explanation of >>>
​
        if(nums[low] < nums[mid]){          // if the far left value is less than the current middle value,
                                            // we know that the pivot is on the righthand side of our current
            low = mid + 1;                  // interval (because the left hand side was strictly increasing),
                                            // so we move the new low up to just above our middle;
            if(nums[low] < nums[mid]) {
                pivot = low;                   // We check to see if our old middle index was in fact the pivot. I.e.,
                break;                         // the array decreases from the old mid down to the new low index at mid + 1.
            }                                   
​
        } else {                                // Otherwise the pivot is somewhere in the lower half, inclusive of  
                                                // the middle (which could itself be the pivot -- e.g. [6, 7, 9, 0, 2, 4, 5].
            if(nums[mid - 1] > nums[mid]){
                pivot = mid - 1;                    // So first we check if the middle is the pivot.
                break;
            }   
      
            high = mid - 1;                    // And if not, we move the new high to just below our middle 
                                                // and start the loop again on the lower half. 
        }
    } 
    // Now that we have our pivot, all we need to do is figure out which half of our array our target might be in.
​
    if (target < nums[pivot]) return -1;              // The pivot is our lowest value, so our target can't be lower.
​
    if (pivot === 0) {                          // If the pivot is at the beginning (i.e. the array is unchanged)
        low = 0;                                // we set up for a binary search of the whole array.
        high = nums.length - 1;
    } else if (target > nums[nums.length - 1]) {       // If the target is greater than the last value, we search the higher-valued
        low = 0;                                       // section of the array, from index 0, to just before the pivot.
        high = pivot - 1;
    } else {
        low = pivot;                            // Otherwise, we seardchg the lower-valued section, from the pivot to 
        high = nums.length - 1;                 // the end of the array.
    }
​
    while (low <= high) {                         // Same idea with the while loop. We either find the target, or we will
        mid = (low + high) >>> 1;                 // keep going until low > high, then we will exit the loop and return -1;
        
        if (nums[mid] === target) return mid;     // test if the middle is our target, then continue as before:
​
        if (nums[mid] > target) high = mid - 1;   // Same idea: Too small, we move up. Too big, we move down.
        
            else low = mid + 1;
    }
​
    return -1;
}
​
​
/* However, we see that the two parts of this solution look pretty similar. Maybe we can do them in one pass. 
The trick is to keep track of both parts of the solution (the search for the pivot and the search for the target) 
at the same time. So we have four options:
​
(1) Pivot in the upper half, and target in the lower half:
​
    The lower indexed half of the array is increasing from array[low] to array[mid] 
        AND the target is between these values.
    => We *know* the target is in the lower half (lower half is strictly increasing 
        and target is somewhere in the middle). We search the lower half.
​
(2) Pivot in the upper half, and target in the upper half:
​
    The lower indexed half of the array is increasing from array[low] to array[mid] 
        AND the target is NOT between these values.
    => We know the target is not in the lower half, so it is *either* in the upper half or not in the array.
        We search the upper half (relying on the default return of -1 if target is not in the array).
​
(3) Pivot in the lower half, and target in the upper half:
​
    The lower indexed half of the array is NOT increasing (i.e. array[mid] < array[low])
        AND the target is between array[mid] and array[high].
    => We know that the target is in the upper half of the array, which is must be strictly increasing if
        the lower half is not (we only get one pivot point here). We search the upper half.
​
(4) Pivot in the lower half, and target in the lower half:
​
    The lower indexed half of the array is NOT inreasing
        AND the target is NOT between array[mid] and array[high] (i.e. the target is not in the upper half)
    => We know that the target is NOT in the upper half, so it is either in the lower half, or not
        present in the array. We search the lower half (and again rely on our default return of -1 if target is not in the array).
*/
​
const singlePass = (nums, target) => {
    let low = 0;
    let high = nums.length - 1;
    let mid;
    while (low <= high) {
         mid = (low + high) >>> 1; 
​
        if (nums[mid] === target)
            return mid;
​
​
        if (nums[low] <= nums[mid]) {
             if (nums[low] <= target && target < nums[mid]) {
                 high = mid - 1;
             } else {
                 low = mid + 1;
             }
        } 
​
        else {
             if (nums[mid] < target && target <= nums[high]) {
                 low = mid + 1;
             } else {
                 high = mid - 1;
             }
         }
    }
    return -1;
}
​
        // But if you really want to play Code Golf, you can do this (search the XOR operator ^ in the
        // MDN docs on binary operators to see how this works):
​
const badAssSolution = (nums, target) => {
    let low = 0;
    let high = nums.length - 1;
    let mid;
    while (low <= high) {
        mid = (low + high) >>> 1; 
        if (nums[mid] === target) return mid;
        
        if(nums[low] <= nums[mid] ^ nums[low] <= target ^ target < nums[mid]) high = mid - 1;
            else low = mid + 1;
                                
    }
        return -1;
}
​
​
​
/* Footnotes.
​
[1]  >>> is the right shift bitwise operator and X >>> 1 is the same as Math.floor(X/2).
​
The only reason we use this instead of Math.floor((low + high) / 2) is that since leetcode was testing for logarithmic
time by running this a bunch of times on smallish arrays (instead of testing on the kind of huge arrays where 
the logarithmic time would really matter), and Math.floor is somewhat inefficient in JS, and Math.floor was timing us out. 
In 99.9% of real world applications, this won't matter. But for that 1 in 1000, here is the math:
​
A >>> B takes the binary representation of the number A and cuts off B digits from the right hand side.
So 29 >>> 2 would give you in binary 11001 for 29 and then you cut off the righthand 2 digits to go from 11001 => 110,
which back in decimal notation would be 6.
​
Just like going from 1093 to 109 in decimal (base 10) divides by 10, and effectively rounds down the 3 by getting
rid of it, in binary (base 2), we divide by 2 and round down:
​
11101 in binary is 29 in decimal (16 + 8 + 4 + 1) and 1110 is 14 in decimal (8 + 4 + 2) 
11100 in binary is 28 in decimal (16 + 8 + 4) and 1110 is the same 14
​
So this works exactly like Math.floor of dividing by 2. */