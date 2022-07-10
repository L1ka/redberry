//Elements
const btnStart = document.querySelector(".btn_start");
const firstPageContainer = document.querySelector(".page1");
const secondPageContainer = document.querySelector(".page2");

//Event Listeners

// listens to the click on first page's get started button, clears existing content and renders next page
btnStart.addEventListener("click", () => {
  firstPageContainer.classList.add("hidden");
  secondPageContainer.classList.remove("hidden");
});

// PERSONAL INFO INPUT ELEMENTS
const inputOne = document.getElementById("name");
const inputTwo = document.getElementById("email");
const inputThree = document.getElementById("tel");
const inputFour = document.getElementById("date");

// VALIDATION ASYNC FUNCTION FOR PERSONAL INFO
const validation = async function () {
  //ELEMENTS
  const container = document.querySelector(".two_part_title");
  const persInfoForm = document.querySelector(".form_personal_info");
  // FUNCTIONS

  // MARKUP FOR ERROR BOX
  const renderErrBox = function (type, message) {
    const markup = `
      <div class="error">
        <img class="mark" src="/imgs/exclamation mark.svg" alt="" />
        <span class="err_type">${type}</span>
        <img class="close" src="/imgs/close.svg" alt="" />
        <p class="err_message">${message}</p>
      </div>
    `;
    container.insertAdjacentHTML("afterBegin", markup);
  };

  // ADD ERROR STYLE ON TEXT
  const renderInputError = function (input) {
    input.classList.add("err");
  };

  // REMOVE ERROR STYLE ON TEXT
  const removeInputErr = function (input) {
    input.classList.remove("err");
  };

  // 2) CHECKS IF ERROR BOX WAS ALREADY RENDERED AND REMOVES IT
  const errBoxCheck = function () {
    const errBox = document.querySelector(".error");
    if (errBox) errBox.classList.add("hidden");
  };

  // TAKES FOUR ARGUMENTS FOR INPUT , ERROR TYPE, ERROR MESSAGE AND INVALID CONDITIONS
  const inputValidation = function (input, type, message, condition) {
    // 1) CHECKS IF AN INPUT IS INVALID
    if (condition) {
      // 2) CHECKS IF ERROR BOX WAS ALREADY RENDERED AND REMOVES IT
      errBoxCheck();

      // 3) RENDERS ERROR
      renderInputError(input);
      renderErrBox(type, message);

      // 4) ADDS EVENT LISTENER ON ERROR BOX AND ON CLICK REMOVES IT
      const errBox = document.querySelector(".error");
      errBox.addEventListener("click", function () {
        errBox.classList.add("hidden");
      });
    } else {
      // 5) IF USER TYPED VALID INPUT REMOVES ERRORS AND INSERTS CHECK MARTK

      // CHECK MARTK
      const markup = `
      <img class='validation_check' src="/imgs/check.svg" alt="" />
      `;
      input.insertAdjacentHTML("afterend", markup);

      // INDEX FOR THE NEXT INPUT TO MOVE FOCUS
      const index = Number(input.classList[1]) + 1;

      Array.from(persInfoForm.querySelectorAll("input")).forEach((el) => {
        const i = Number(el.classList[1]);

        if (i === index) {
          el.focus();
          el.closest("div").querySelector("label").remove();
        }
      });

      // REMOVE ERR STYLES AND POP UP
      removeInputErr(input);
      errBoxCheck();
    }
  };
};
validation();
