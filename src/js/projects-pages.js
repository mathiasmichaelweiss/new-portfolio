"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const btnFill = document.querySelector(".work__btn__red__fill"),
    workBtn = document.querySelector(".work__btn");

  console.log(btnFill);
  console.log(workBtn);
  btnFill.classList.add("orangeBtn");

  workBtn.addEventListener("mouseover", () => {
    btnFill.style = "left: 0rem";

    workBtn.style = "border: 1px solid #F95A2E";
  });
  workBtn.addEventListener("mouseout", () => {
    btnFill.style = "";
    workBtn.style = "";
  });
});
