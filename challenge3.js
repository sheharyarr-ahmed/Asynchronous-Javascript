"use strict";
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

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImage = img;
//     console.log("image 1 is loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImage = img;
//     console.log("image 2 loaded");
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = "none";
//   })
//   .catch((err) => console.error(err));

const loadNpause = async function () {
  try {
    //load image 1
    let img = await createImage("img/img-1.jpg");
    console.log("image 1 is loaded");
    await wait(2); //nothing useful to store
    img.style.display = "none";
    //load image 2
    img = await createImage("img/img-2.jpg");
    console.log("image 2 is loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};

// loadNpause();

// PART 2
const laodAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
};

laodAll(["img/img-2.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
