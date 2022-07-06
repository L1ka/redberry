//Elements
const btnStart = document.querySelector(".btn_start");
const firstPageContainer = document.querySelector(".page1");
const secondPageContainer = document.querySelector(".page2");

//Event Listeners

// listens to the click on first page's get started button, clears existing content and renders next page
btnStart.addEventListener("click", () => {
  firstPageContainer.style.display = "none";
  secondPageContainer.classList.remove("hidden");
});
