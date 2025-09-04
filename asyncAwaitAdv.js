"use strict";
// use of async, await, then(), catch(), async iife and returning values form async functions
// this file shows how do we return the values from the async functions, an async fucntion always returns an promise.
const countriesContainer = document.querySelector(".countries");
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages
      ).join(", ")}</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    console.log(resGeo);
    if (!resGeo.ok) throw new Error("PROBLEM GETTING THE LCOATION DATA");
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.countryName}`
    );
    if (!res.ok) throw new Error("PROBLEM GETTING THE COUNTRY");

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `you are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error("this is an error", err);
    renderError(`SOMETHING WENT WRONG 💩 ${err.message}`);
    throw err;
  }
};

// whereAmI();
// const test = whereAmI();
// console.log(test); // the return value from the async functon will be the promsie and that will be the return message so if we want to chain it we can do it with then()
// whereAmI()
//   .then((res) => console.log(res)) //this gets executed
//   .catch((err) => console.error(`2: ${err.message}`))
//   .finally(() => {
//     console.log("3: third message");
//   }); // because of this we getting undefined in the console so in order to reject this promise we added another throw err above in the catch block

//conversion of the above return async function from then to await
(async function () {
  try {
    const city = await whereAmI();
    // console.log("this returned", city);
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💩`);
  }

  console.log("finished getting location");
})();
