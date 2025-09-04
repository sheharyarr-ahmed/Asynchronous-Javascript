"use strict";
// •	setTimeout schedules code to run later.
// •	img.addEventListener("load") triggers asynchronously when the image loads.
// •	Promises (resolve, reject) represent future values and enable chaining.
// •	.then() and .catch() callbacks are executed asynchronously via the microtask queue.
const imgContainer = document.querySelector(".images");
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
let currentImage;
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("image not found"));
    });
  });
};

createImage("img/img-1.jpg")
  .then((img) => {
    currentImage = img;
    console.log("image 1 is loaded");
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImage = img;
    console.log("image 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
  })
  .catch((err) => console.error(err));
