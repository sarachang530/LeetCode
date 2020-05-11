// Recursively explore all options
const knapsack = (itemsLeft, weightAvailable) => {
  ​
    if (itemsLeft.length === 0 || weightAvailable === 0) return 0;
  ​
    // if first item is too heavy to fit, consider other items
    if (itemsLeft[0].weight > weightAvailable) {
      return knapsack(itemsLeft.slice(1), weightAvailable);
    }
    //if first item does fit
    else {
      const left = itemsLeft.slice(1);
      const takeItem = itemsLeft[0].value + knapsack(left, weightAvailable - itemsLeft[0].weight);
      const leaveItem = knapsack(left, weightAvailable);
  ​
      return (takeItem > leaveItem) ? takeItem : leaveItem;
    }
  