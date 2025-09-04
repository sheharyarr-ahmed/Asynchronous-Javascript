"use strict";
//promise combinators, promise.all(), promsie.race() and priomsie.allSettled()
const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    console.log(response);
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
    return response.json();
  });
};
// Promise.all([])
// Runs all promises in parallel and returns an array of results.
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3Countries("portugal", "india", "jordan");

//PROMISE.RACE()
//the promsie.race([]) accepts an array of promisses and whichever promise either fulfied or rejects first it will give as an resolved
(async function () {
  const res = await Promise.race([
    getJSON("https://restcountries.com/v3.1/name/italy"),
    getJSON("https://restcountries.com/v3.1/name/usa"),
    getJSON("https://restcountries.com/v3.1/name/pakistan"),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("request took too long"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON("https://restcountries.com/v3.1/name/usa"),
  timeout(0.0001),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//PROMSIE.ALLSETTLED()
// accepts an array of promisses and resolves all the fulfill and rejects promisses
Promise.allSettled([
  Promise.resolve("this is resolved"),
  Promise.reject("this is not resolved"),
  Promise.resolve("this is resolved"),
]).then((res) => {
  console.log(res);
});

// PROMISE.ANY([])
// Returns the result of the **first fulfilled promise**. Ignores rejections until all reject.
Promise.any([
  Promise.resolve("this is resolved"),
  Promise.reject("this is not resolved"),
  Promise.resolve("this is resolved"),
]).then((res) => {
  console.log(res);
});
