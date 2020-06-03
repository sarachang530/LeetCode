// add two numbers the same way you would do manually 
/**
 * Write an algorithm that performs an addition in a way that is done manually.

Example: 
Adding two numbers given as a string: 253 & 29

    253
  +  29
    (1)
  ------
    282


Input: 
firstNumber: string
secondNumber: string
 */


function manualAdd(firstNumber, secondNumber) {
  let sum = '';
  const maxLength = Math.max(firstNumber.length, secondNumber.length);
  let carryOver = '';

  for (let i = maxLength; i >= 0; i -= 1) {
    const first = firstNumber.slice(firstNumber.length - 1);
    const second = secondNumber.slice(secondNumber.length - 1) || 0;
    const tempSum = Number(first) + Number(second) + carryOver;

    if (tempSum > 9) {
      carryOver = 1;
    } else {
      carryOver = '';
    }
    sum = (tempSum[tempSum.length - 1] || tempSum) + sum;    
    firstNumber = firstNumber.substring(0, firstNumber.length - 1);
    secondNumber = secondNumber.substring(0, secondNumber.length - 1);
  }
   return parseInt(sum, 10);
 }