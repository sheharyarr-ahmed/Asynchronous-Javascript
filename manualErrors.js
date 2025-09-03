// "use strict";
// //handling error is the only way to make custo errors
// const btn = document.querySelector(".btn-country");
// const countriesContainer = document.querySelector(".countries");
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText("beforeend", msg);
// };
// const renderCountry = function (data, className = "") {
//   const html = `<article class="country ${className}">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         data.population / 1000000
//       ).toFixed(1)}M people</p>
//       <p class="country__row"><span>🗣️</span>${Object.values(
//         data.languages
//       ).join(", ")}</p>
//       <p class="country__row"><span>💰</span>${
//         Object.values(data.currencies)[0].name
//       }</p>
//     </div>
//   </article>`;

//   countriesContainer.insertAdjacentHTML("beforeend", html);
// };

// const getJSON = function (url, errMsg = "Something went wrong") {
//   return fetch(`https://restcountries.com/v3.1/name/${country}`).then(
//     (response) => {
//       console.log(response);
//       if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
//       return response.json();
//     }
//   );
// };
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       console.log(response);
//       if (!response.ok) throw new Error(`Country not found ${response.status}`); //if the errors appears to be true here it wil immediately run the catch method.
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => renderCountry(data[0], "neighbour"))
//     .catch((err) => {
//       console.error(`${err} 💣💣💣`);
//       renderError(
//         `something went wrong in the promises chain. try again, ${err.message}`
//       );
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener("click", function () {
//   getCountryData("uae");
// });

// // getCountryData("fgfgfgff"); // due to this it throws the 404 error
//
//
//
//////////////////////////////////////////////////////////////////////
// new updated code with the implementation of the manual error handling
"use strict";
//handling error is the only way to make custo errors
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
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
};
// helper function
const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    console.log(response);
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "country not found")
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      if (!neighbour) throw new Error("No neighbour found");

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      console.error(`${err} 💣💣💣`);
      renderError(
        `something went wrong in the promises chain. try again, ${err.message}`
      );
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  getCountryData("australia");
});

// getCountryData("fgfgfgff"); // due to this it throws the 404 error
