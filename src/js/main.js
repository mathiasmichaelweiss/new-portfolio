"use strict";

window.addEventListener("DOMContentLoaded", () => {
  function anchors() {
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        const blockID = anchor.getAttribute("href").substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  }

  anchors();

  /* Paralax */

  function paralaxThis(elem, trX, trY) {
    window.addEventListener("mousemove", function (e) {
      const paralaxItem = document.querySelector(elem);

      let x = e.clientX / window.innerWidth;
      let y = e.clientY / window.innerHeight;
      paralaxItem.style.transform =
        "translate(-" + x * trX + "px, -" + y * trY + "px)";
    });
  }

  paralaxThis(".greeting__my__photo", 25, 2);

  const navItems = document.querySelectorAll(".header__nav__item");

  navItems.forEach(item => {
    const loadTime = window.setTimeout(() => {
      item.style.opacity = "1";
    }, 300);
  });

  function addMoveClass(itemClass, addClass, animation) {
    const item = document.querySelector(itemClass);
    item.classList.add(addClass);
    item.style.animation = animation;
  }

  function removeMoveClass(itemClass, addClass, animation) {
    const item = document.querySelector(itemClass);
    item.classList.remove(addClass);
    item.style.animation = animation;
  }

  window.addEventListener("scroll", function () {
    let scrollResult = window.pageYOffset;
    /* console.log(scrollResult); */
  });

  let isScrolled = true;
  window.addEventListener("scroll", function () {
    const about = document.querySelector(".about");

    function setValue(elem, value, inc, shift, speed) {
      let interval = false;
      elem.innerHTML = 0;
      if (inc) {
        interval = setInterval(function () {
          if (elem.innerHTML * 1 + shift >= value) {
            elem.innerHTML = value;
            clearInterval(interval);
          } else {
            elem.innerHTML = elem.innerHTML * 1 + shift;
          }
        }, speed);
      } else {
        interval = setInterval(function () {
          if (elem.innerHTML * 1 - shift <= value) {
            elem.innerHTML = value;
            clearInterval(interval);
          } else {
            elem.innerHTML = elem.innerHTML * 1 - shift;
          }
        }, speed);
      }
    }

    const result = document.querySelectorAll(".result");

    if (window.pageYOffset >= 954) {
      document.querySelector(".up").classList.add("show_up");
    } else {
      document.querySelector(".up").classList.remove("show_up");
    }

    if (window.pageYOffset >= 460) {
      addMoveClass(
        ".skills",
        "move_block_left_to_right",
        "showBlockLeft .5s linear forwards"
      );
      about.style.opacity = "1";

      function openAccordOnce() {
        if (isScrolled) {
          const loadTime = window.setTimeout(() => {
            function initAccordeon() {
              const firstSectionBodyHeight = document.querySelector(
                ".accordeon-section .accordeon-body > *"
              ).clientHeight;
              document.querySelector(
                ".accordeon-section .accordeon-body"
              ).style.maxHeight = firstSectionBodyHeight + "px";
            }
            result.forEach((item, i) => {
              let resultValue = +result[i].textContent;
              setValue(result[i], resultValue, true, 1, 20);
            });
            initAccordeon();
          }, 1000);
        }
        isScrolled = false;
      }
      openAccordOnce();
      /* console.log(isScrolled); */
    }
    if (window.pageYOffset >= 2010) {
      removeMoveClass(
        ".skills",
        "move_block_left_to_right",
        "hiddenBlockLeft .1s linear forwards"
      );
      about.style.opacity = "0";
    }
    if (window.pageYOffset < 400) {
      removeMoveClass(
        ".skills",
        "move_block_left_to_right",
        "hiddenBlockLeft .1s linear forwards"
      );
      about.style.opacity = "0";
    }

    /* animate skills */
    const skillsClasses = document.querySelector(".skills").classList,
      skillLvl = document.querySelectorAll(".skill__lvl"),
      accordeonSection = document.querySelectorAll(".accordeon-section");

    if (skillsClasses.contains("move_block_left_to_right")) {
      skillLvl.forEach(item => {
        item.setAttribute("id", "animate__skill__ground");
      });
    }

    if (!skillsClasses.contains("move_block_left_to_right")) {
      skillLvl.forEach(item => {
        item.removeAttribute("id", "animate__skill__ground");
      });
    }

    /* accordion */
    function accordeon(addSection, addBody) {
      const accordeonHeaderClickHandler = e => {
        document.querySelectorAll(addSection).forEach(section => {
          section.querySelector(addBody).style.maxHeight = "0px";
        });

        const accordeonSection = e.target.closest(addSection),
          insideElHeight = accordeonSection.querySelector(`${addBody} > *`)
            .clientHeight;

        accordeonSection.querySelector(".accordeon-body").style.maxHeight =
          insideElHeight + "px";
      };

      accordeonSection.forEach(section => {
        section.addEventListener("click", accordeonHeaderClickHandler);
      });
    }

    accordeon(".accordeon-section", ".accordeon-body");
  });

  /* my works */
  const slider = tns({
    container: ".my-slider",
    items: 4,
    gutter: 33,
    mouseDrag: true,
    slideBy: "page",
    autoplay: false,
    controls: false
  });

  const workContainer = document.querySelectorAll(".work__item__container"),
    workItem = document.querySelectorAll(".work__item"),
    work = document.querySelectorAll("img.work"),
    workInfo = document.querySelectorAll(".work-info"),
    workBtnFill = document.querySelectorAll(".work__btn__red__fill"),
    workBtn = document.querySelectorAll(".work__btn"),
    btnFill = document.querySelectorAll(".work__btn__red__fill"),
    swpeTo = document.querySelector(".swipe__to");

  swpeTo.style.display = "none";

  if (workContainer.length >= 5) {
    swpeTo.style.display = "";
  }

  workContainer.forEach((item, j) => {
    if (j % 2 == 0) {
      workContainer[j].style = "border: 1px solid #FFD500";
      workItem[j].classList.add("yellow");
      document.querySelectorAll(".work__title")[j].style = "color: #FFD500";
      btnFill[j].classList.add("yellowBtn");
    } else {
      btnFill.forEach(fill => {
        if (!fill.classList.contains("yellowBtn")) {
          fill.classList.add("redBtn");
        } else {
          fill.classList.remove("redBtn");
        }
      });
    }

    item.addEventListener("click", () => {
      if (item.style.maxHeight == "100rem") {
        item.style.maxHeight = "2.3rem";
      } else {
        item.style.maxHeight = "100rem";
      }

      item.addEventListener("mouseover", e => {
        if (
          e.target.classList.contains("work") ||
          e.target.classList.contains("work-info") ||
          e.target.classList.contains("work__title") ||
          e.target.classList.contains("work__descr") ||
          e.target.classList.contains("work__btn") ||
          e.target.classList.contains("work__btn__text") ||
          e.target.classList.contains("work__btn__red__fill")
        ) {
          work[j].style =
            "filter: brightness(15%); transition: transform .3s ease-in; transform: scale(1.5);";
          workInfo[j].style = "bottom: 10rem; opacity: 1";
        }
      });
      item.addEventListener("mouseout", () => {
        workInfo.forEach(info => {
          info.style =
            "bottom: -15rem; opacity: 0;bottom 0.1s ease-in, opacity 0.1s ease-in";
          work[j].style =
            "transform: scale(1); transition: transform .3s ease-in";
        });
      });
      workBtn.forEach((btn, l) => {
        btn.addEventListener("mouseover", () => {
          workBtnFill[l].style = "left: 0rem";
          if (!btnFill[l].classList.contains("yellowBtn")) {
            workBtn[l].style = "border: 1px solid #FF001F";
          } else {
            workBtn[l].style = "border: 1px solid #FFD500";
          }
        });
        btn.addEventListener("mouseout", () => {
          workBtnFill[l].style = "";
          workBtn[l].style = "";
        });
      });
    });
  });

  /* Form */
  let button = document.querySelector(".submit");

  /*add event on the send button*/
  button.addEventListener("click", function (event) {
    event.preventDefault();
    /*create object*/
    let formData = {
      name: document.querySelector("#name").value,
      company: document.querySelector("#company").value,
      subject: document.querySelector("#subject").value,
      email: document.querySelector("#email").value,
      message: document.querySelector("#message").value
    };

    /*transmit data*/
    let request = new XMLHttpRequest();

    request.open("POST", "server.php");
    request.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );
    request.send(
      "name=" +
        encodeURIComponent(formData.name) +
        "&company=" +
        encodeURIComponent(formData.company) +
        "&subject=" +
        encodeURIComponent(formData.subject) +
        "&email=" +
        encodeURIComponent(formData.email) +
        "&message=" +
        encodeURIComponent(formData.message)
    );
  });
});
