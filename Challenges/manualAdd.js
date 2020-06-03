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


 /////////////////////////////////////////////////

 const manualSum = (str1, str2) => {
  let sum = []
  let n1, n2
  let curr = carry = 0

  str1.length > str2.length 
  ? [n1, n2] = [str1.split(''), str2.split('')]
  : [n1, n2] = [str2.split(''), str1.split('')]
  
  while(n1.length !== n2.length)
   n2.unshift(0)
  
  while (n1.length > 0) {
      curr = +n1.pop() + +n2.pop() + carry
      carry = 0
      if (curr > 9) {
          curr += ''
          sum.unshift(curr.slice(-1))
          carry = +curr.slice(0, -1)
      } else sum.unshift(curr)
  }
  return sum.join('')
}



 /////////////////////////////////////////////////

 const manualAdd = (str1, str2, sum = [], remainder = 0) => {
  let num1 = str1 / 10;
  let num2 = str2 / 10;

  while (num1 || num2) {
    const numSum = Math.round(remainder + (num1 % 1 + num2 % 1) * 10);
    numSum < 10 ? sum.push(numSum)
      : sum.push(numSum % 10) && (remainder = Math.floor(numSum / 10));
    num1 = Math.floor(num1) / 10;
    num2 = Math.floor(num2) / 10;
  }

  return sum.reverse().join('')
}

console.log(manualAdd('253', '29')); // => 282
console.log(manualAdd('253', '48')); // => 301
console.log(manualAdd('12000', '1')); // => 12001