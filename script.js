"use strict";
//making the first html request but in the xml format
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const getCountryInfo = function (country) {
  // setting the api
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send(); //to send the request to the server/ link mentioned above

  request.addEventListener("load", function () {
    // converting the format from xml to JSON
    const data = JSON.parse(this.responseText)[0]; // 👈 Access first object
    console.log(data);

    const html = `<article class="country">
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
  });
};

getCountryInfo("usa");
getCountryInfo("argentina");
getCountryInfo("russia");
