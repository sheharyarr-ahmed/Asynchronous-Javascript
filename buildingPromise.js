"use strict";
// basically here we are building a promsie in such way by using the new Promsie method where it has one aruguement executor function and that executor function takes two arguemnts resolve and reject
const lotteryPromsie = new Promise(function (
  //executor function
  resolve,
  reject
) {
  console.log("DRAW IS HAPPENING");
  setTimeout(function () {
    //implementing the asynchronus behaviour
    if (Math.random() >= 0.5) {
      resolve("YOU WON");
    } else {
      reject(new Error("YOU LOOSE"));
    }
  }, 2000);
});

lotteryPromsie
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });

//   promisifying the set timeout function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3)
  .then(() => {
    console.log("i waited for 3 seconds");
    return wait(2);
  })
  .then(() => {
    console.log("i waited for 2 seconds");
  });

Promise.resolve("this will resolve immediately").then((res) =>
  console.log(res)
);

Promise.reject("this will get rejected").catch(
  new Error((err) => console.log(err))
);
