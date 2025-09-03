"use strict";
// handling the error and catching the error
// then(), catch(), finally()

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
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
  // countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      (response) => response.json()
      // (err) => alert(err) //catching the error if it fails to fetch with the api instead of throwing the error it will retunr this
    )
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(
      (response) => response.json()
      // (err) => alert(err)
    )
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      console.error(`${err} 💣💣💣`);
      renderError(
        `something went wrong in the promises chain. try again, ${err.message}`
      );
    })
    .finally(() => (countriesContainer.style.opacity = 1)); //instead of catching the errors above one by one we added this method to catch error if its to be found anywhere in this promise chain. here the finally method is used for something which we acttually want to get triggered whether the then is fulfilled or or catch is triggerede this finally method will always runs.
};

btn.addEventListener("click", function () {
  getCountryData("uae");
});
