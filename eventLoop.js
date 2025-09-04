"use stirct";
// understaning of the event loop
// 1. call stack
// 2. regular call back function
// 3. mircrotask like then()
// 4. web api's
// In JavaScript, when code runs, all synchronous tasks are executed first on the call stack, while asynchronous functions like setTimeout or fetch are handed off to browser Web APIs, which run them in the background. Once these operations finish, their callbacks are placed into the callback (macrotask) queue. Meanwhile, when a promise or async/await is used, its callbacks are sent to the microtask queue, which has higher priority than the callback queue. The event loop constantly checks whether the call stack is empty, and when it is, it first processes all microtasks, running promise callbacks before handling macrotasks such as timer callbacks or DOM events. This proves that browser APIs offload work to run asynchronously while JavaScript continues executing code, and the event loop ensures promises are always resolved first, even if a timer is set to zero milliseconds.
console.log("test start");
setTimeout(() => console.log("0 sec timer"), 0); // the timer will get delayed because first the call stack will first look for the microtasks which are the promises
Promise.resolve("resolved promise 1").then((res) => console.log(res));
Promise.resolve("resolved promise 1").then((res) => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log("test end");

// the above code shows that
// Synchronous code always runs first.
//Promises (microtasks) have higher priority than timers (macrotasks).
//Long-running code inside microtasks (like the for loop) blocks the event loop, delaying timers.
