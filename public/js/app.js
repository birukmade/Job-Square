const desktopHamburgerElement = document.querySelector(
  ".desktop-hamburger-menu"
);
const mobileHamburgerElement = document.querySelector(".mobile-hamburger-menu");

const backdropElement = document.querySelector(".backdrop");
const sideDrawerElement = document.querySelector("#side-drawer");

desktopHamburgerElement.addEventListener("click", toogleSideDraweer);
backdropElement.addEventListener("click", toogleSideDraweer);
mobileHamburgerElement.addEventListener("click", toogleSideDraweer);

function toogleSideDraweer() {
  backdropElement.classList.toggle("expand");
  sideDrawerElement.classList.toggle("expand");
}
