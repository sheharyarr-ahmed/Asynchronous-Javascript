"use strict";
// asynchronus promisifying
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
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
// getPosition().then((res) => {
//   console.log(res);
// });
const whereAmI = function () {
  getPosition()
    .then((pos) => {
      console.log(pos);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
      //   console.log(res);
    })
    .then((data) => {
      console.log(data);
      console.log(`you are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.error(`${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", whereAmI);
