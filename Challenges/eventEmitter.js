/*
Make an EventEmitter class that mimics the functionality of event listeners.
​
EventEmitter will have two methods:
- an 'on' method that will take in a function name and function declaration
- a 'trigger' method that takes in a function name and optional arguments
​
When 'trigger' is invoked, it should execute the function passed in,
according to functions assigned with the 'on' method.
​
Example:
  const instance = new EventEmitter();
  let counter = 0;
  instance.on('increment', () => counter++); // counter should be 0
  instance.trigger('increment'); // counter should be 1
  instance.trigger('increment'); // counter should be 2
​
​
Caveats:
- If we repeatedly call .on with the same event name, it should
  continue to call the old function(s) as well.
  Meaning, we can have multiple listeners for one event.
- If `obj.trigger` is called with additional arguments, pass those to the listeners.
- It is not necessary to write a way to remove listeners.
​
*/
​
​
function EventEmitter() {
  this.triggers = {};
}
​
EventEmitter.prototype.on = function (eventName, func) {
  // set key of eventName and value of func in this.triggers object
  // value will be an array of function definitions
  // so all can be invoked when the eventName trigger is emitted
  this.triggers.hasOwnProperty(eventName)
    ? this.triggers[eventName].push(func)
    : this.triggers[eventName] = [func];
};
​
// * analagous to Node.js EventEmitter.emit
EventEmitter.prototype.trigger = function (eventName, ...args) {
  // if eventName key exists in this.triggers,
  if (this.triggers.hasOwnProperty(eventName)) {
    // iterate over associated value array, invoking each func with args
    this.triggers[eventName].forEach((func) => func(...args));
  }
};
​
const instance = new EventEmitter();
let counter = 0;
instance.on('increment', () => counter++);
console.log(counter); // counter should be 0
instance.trigger('increment');
console.log(counter); // counter should be 1
instance.trigger('increment');
console.log(counter); // counter should be 2
Collapse



:fire:
3

