const promiseAll = (promises) => {
  const n = promises.length;
​
  return new Promise((resolve, reject) => {
    let completed = 0;
    const results = new Array(n).fill(null);
​
    promises.forEach((promise, i) => {
      promise
        .then((result) => {
          completed += 1;
          results[i] = result;
​
          if (completed === n) { resolve(results); }
        })
        .catch((err) => {
          // console.log(err)
          reject(err);
        });
    });
  });
};
​
// const promise1 = Promise.resolve(3);
// const promise2 = new Promise((resolve, reject) => {
//  setTimeout(resolve, 100, 'foo');
//});
// const promise3 = Promise.reject('say no')
​
// promiseAll([promise1, promise2, // promise3]).then((values) => {
//  console.log(values);
//});
// expected output: [3, "foo"]