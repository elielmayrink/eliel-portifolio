let galery = document.querySelectorAll(".product-img");
let selectedImg = document.querySelector("#selected-img");
let buyButton = document.querySelector("#buy-button");
let menuSection = document.querySelector("#menu-section");
let menuToggle = document.querySelector("#menu-toggle");

menuToggle.addEventListener("click", () => {
  menuSection.classList.toggle("on");
  console.log("ta clicando");
});

buyButton.addEventListener("click", function () {
  alert("Parabens pela compra");
});
galery.forEach(function (element) {
  element.addEventListener("click", function () {
    galery.forEach(function (img) {
      if (img === element) {
        img.classList.add("selected");
        selectedImg.src = img.src;
      } else {
        img.classList.remove("selected");
      }
    });
  });
});
