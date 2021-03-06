//Elements
const btnStart = document.querySelector(".btn_start");
const firstPageContainer = document.querySelector(".page1");
const secondPageContainer = document.querySelector(".page2");
const thirdPageContainer = document.querySelector(".page3");
const inputs = document.querySelectorAll("input");

const firstBackBtn = document.querySelector(".first_back_btn");
const fourthPageContainer = document.querySelector(".page4");
const nextBtn = document.querySelector(".next_page");

const doneBtn = document.querySelector(".next_page_2");
const ulLevel = document.querySelector(".level_ul");

const li = document.querySelectorAll("li");
const activeLi = document.querySelector(".active");
const levelInfoDropdown = document.querySelector(".level");
const characterDropdown = document.querySelector(".character");
const dropdownContainer = document.querySelector(".dropdown");
const levelListTitle = document.querySelector(".level_list_title");
const characterListTitle = document.querySelector(".character_list_title");
const downArrowLevel = document.querySelector(".down_arrow_level");
const downArrowCharacter = document.querySelector(".down_arrow_character");
const upArrowLevel = document.querySelector(".up_arrow_level");
const upArrowCharacter = document.querySelector(".up_arrow_character");
const test = document.querySelector(".form_personal_info");
const inputContainer = document.querySelectorAll(".input-required");

const labels = document.querySelectorAll("label");

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

  //EVENT LISTENERS

  //// INPUT VALIDATION FOR ALL FOUR INPUT

  inputOne.addEventListener("change", (e) => {
    inputValidation(
      inputOne,
      "Invalid Name",
      "Please enter valid name",
      inputOne.value.length < 2
    );
  });

  inputTwo.addEventListener("change", () => {
    inputValidation(
      inputTwo,
      "Invalid email",
      "Please enter valid email address",
      !inputTwo.value.match(new RegExp("[a-z0-9]+@redberry.ge"))
    );
  });

  inputThree.addEventListener("change", () => {
    inputValidation(
      inputThree,
      "Invalid Phone Number",
      "Please enter valid phone number",
      inputThree.value.length !== 9 ||
        inputThree.value.match(new RegExp(/[^0-9]/, "g"))
    );
  });

  inputFour.addEventListener("change", () => {
    // splits date value into separate elements for month, day and year
    const strg = inputFour.value.split("-");
    const mm = parseInt(strg[1]);
    const dd = parseInt(strg[2]);
    const yy = parseInt(strg[0]);
    // variables for invalid input types to be checked
    const empty = !(mm || dd || yy);
    const startsWithZero = Number(strg[0][0]) === 0;
    const minLength = strg[0].length === 4;
    const maxYear = 2022;

    inputValidation(
      inputFour,
      "Invalid date format!",
      "Please enter valid date",
      empty || startsWithZero || !minLength || yy > maxYear
    );
  });

  // ADD EVENT LISTENER ON NEXT BUTTON AND ON CLICK CHECKS VALIDATION TO BE PASSED
  nextBtn.addEventListener("click", () => {
    //CONDITIONS IF PERSONAL INFO CONTAINS ERROR OR INPUTS ARE EMPTY
    const error = Array.from(inputs).some((el) => el.classList.contains("err"));
    const empty = Array.from(inputs).some((el) => !el.value);

    //IF THERE IS AN ERROR CHECK WHICH INPUT IS INVALID AND RENDERS SPECIFIC ERROR
    inputs.forEach((input) => {
      const condition = input.classList.contains("err");
      if (condition || !input.value) {
        if (Number(input.classList[1]) === 1) {
          errBoxCheck();
          renderErrBox("Invalid Name", "Please enter valid name");
        }
        if (Number(input.classList[1]) === 2) {
          errBoxCheck();
          renderErrBox("Invalid email", "Please enter valid email address");
        }
        if (Number(input.classList[1]) === 3) {
          errBoxCheck();
          renderErrBox(
            "Invalid Phone Number",
            "Please enter valid phone number"
          );
        }
        if (Number(input.classList[1]) === 4) {
          errBoxCheck();
          renderErrBox("Invalid date format!", "Please enter valid date");
        }
        errBoxCheck();
        renderErrBox("required field", "Please fill in the required fields");
      }
      //IF THERE IS NO INVALID INPUTS GENERATES FORM DATA AND MAKES OBJECT WITH USER INPUTS
      //THAN SAVES OBJECT IN LOCAL STORAGE
      if (!error && !empty) {
        //CREATE OBJECT FROM FORM DATA
        const obj = {};
        const data = new FormData(persInfoForm);
        let arr1 = [...data.keys()];
        let arr2 = [];

        for (let key of data.keys()) {
          arr2.push(data.get(key));
        }

        arr1.forEach((element, index) => {
          obj[element] = arr2[index];
        });

        // SAVE OBJECT IN LOCAL STORAGE
        const dataFormated = JSON.stringify(obj);
        localStorage.setItem("lika", dataFormated);

        // GO TO NEXT PAGE AND
        secondPageContainer.classList.add("hidden");
        thirdPageContainer.classList.remove("hidden");
      }
    });
  });
};
validation();

// GOING BACK FROM PERSONAL INFO PAGE
firstBackBtn.addEventListener("click", function () {
  firstPageContainer.classList.remove("hidden");
  secondPageContainer.classList.add("hidden");
});

// DISABLE TAB KEY
document.addEventListener("keydown", function (e) {
  if (e.key === "Tab") e.preventDefault();
});

//SHOWS AND HIDES DROPDOWN FOR EXPERIENCE LEVEL  ON CLICK
levelInfoDropdown.addEventListener("click", () => {
  ulLevel.classList.toggle("hidden");
});

//ON CLICK ON DROPDOWNS RENDERS SELECTED OPTION
li.forEach((li) => {
  li.addEventListener("click", (e) => {
    const clicked = e.target.closest(".level");

    if (clicked) {
      levelListTitle.textContent = li.textContent;
      levelListTitle.classList.add("selected_level");

      return;
    }
    characterListTitle.textContent = li.textContent;
    characterListTitle.classList.add("selected_character");
    li.classList.add("selected");
  });
});

// FOR CLICK ON DROPDOWNS CHANGES UP AND DOWN ARROWS
dropdownContainer.addEventListener("click", function (e) {
  const clickedLevel = e.target.closest(".level");
  const clickedCharacter = e.target.closest(".character");

  if (clickedLevel) {
    downArrowLevel.classList.toggle("hidden");
    upArrowLevel.classList.toggle("hidden");
    return;
  }
  if (clickedCharacter) {
    downArrowCharacter.classList.toggle("hidden");
    upArrowCharacter.classList.toggle("hidden");
  }
});

// REMOVES DEFAULT ACTIVE STYLE ON EXPERIENCE BEGINNER OPTION
li.forEach((li) =>
  li.addEventListener("mouseover", (e) => {
    if (!li.classList.contains(".active")) {
      activeLi.classList.remove("active");
      li.removeEventListener("click", this);
    }
  })
);

inputContainer.forEach((input) => {
  input.addEventListener("click", function (e) {
    const curLabel = e.target.closest("div").querySelector("label");
    const curInput = e.target.closest("div").querySelector("input");
    if (!curLabel) return;
    curLabel.classList.add("hidden");

    curInput.focus();
  });
});

//GET DATA FROM API
const getData = async function (url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

// RENDERS UL LIST DROP DOWN WITH API DATA
const renderUl = async function () {
  const data = await getData(
    `https://chess-tournament-api.devtest.ge/api/grandmasters`
  );

  const ulCharacter = document.querySelector(".character_ul");
  const arr = Array.from(ulCharacter.querySelectorAll("li"));
  const arr2 = Array.from(ulCharacter.querySelectorAll("img"));

  //FOR NAME AND ID INSERT
  arr.forEach((_, i) => {
    arr[i].textContent = data[i].name;
    arr[i].id = data[i].id;
  });

  // FOR IMAGE INSERTING
  arr2.forEach((_, i) => {
    arr2[i].src = data[i].image;
  });

  // ON KLICK SHOWS OR HIDES CHARACTER DROPDOWN
  characterDropdown.addEventListener("click", () => {
    ulCharacter.classList.toggle("hidden");
  });
};

renderUl();

const backBtn = document.querySelector(".back_btn");

//TO GO BACK TO PERS INFO PAGE
//BEFORE LEAVING PAGE, SAVES EXISTING USER INPUTS IN LOCAL STORAGE LIKA2
//ALSO SAVES SELECTED CLASS NAMES TO  FIND ACTIVE FIELDS AFTER PAGE REFRESH LIKA3
backBtn.addEventListener("click", function () {
  //THREE OPTION TYPES (LEVEL, CHARACTER, RADIO BUTTON)
  const one = document.querySelector(".selected_level")?.textContent.trim();
  const two = Number(document.querySelector(".selected")?.id);
  console.log(typeof one);
  let three = "";
  if (radioYes.checked) three = true;
  if (radioNo.checked) three = false;

  // PUSHING ACTIVE CLASSES IN ARR
  let arr = [];
  if (one) {
    arr.push("selected_level");
  }

  if (two) {
    arr.push("selected_character");
  }
  // SAVEING ACTIVE CLASSES IN LOCALSTORAGE
  const dataFormated1 = JSON.stringify(arr);
  localStorage.setItem("lika3", dataFormated1);

  // IF THERE IS NO INPUT YET , FROM USER
  if (!one && !two && !three) {
    thirdPageContainer.classList.add("hidden");

    secondPageContainer.classList.remove("hidden");
    return;
  }

  // OBJ2 OBJECT WILL CONTAIN USER SELECTED FIELDS
  const obj2 = {
    experience_level: "",
    already_participated: three,
    character_id: two,
  };

  if (one) {
    obj2.experience_level = one;
  } else {
    obj2.experience_level = levelListTitle.textContent;
  }

  // SAVES EXISTING USER INPUTS IN LOCAL STORAGE
  const dataFormated = JSON.stringify(obj2);
  console.log(dataFormated, obj2);
  localStorage.setItem("lika2", dataFormated);

  // GO TO PERS INFO PAGE
  thirdPageContainer.classList.add("hidden");
  secondPageContainer.classList.remove("hidden");
});

const radioYes = document.getElementById("radio_yes");
const radioNo = document.getElementById("radio_no");
const container = document.querySelector(".err_container");
let charSelected = false;
let levelSelected = false;

// ON DONE BTN CHECKS VALIDATION
// SAND DATA TO SERVER
// CLEAR LOCAL STPRAGE
// IF INVALID POP UP ERROR
doneBtn.addEventListener("click", function () {
  if (characterListTitle.classList.contains("selected_character"))
    charSelected = true;

  if (levelListTitle.classList.contains("selected_level")) levelSelected = true;

  // FOR ERROR POP-UP
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

  // CHECKS IF EVERY REQUIRED FIELD IS FILLED
  if (charSelected && levelSelected && (radioYes.checked || radioNo.checked)) {
    const one = document.querySelector(".selected_level").textContent.trim();

    const two = Number(document.querySelector(".selected").id);

    let three = "";
    if (radioYes.checked) three = true;
    if (radioNo.checked) three = false;

    // GENERATES DATA FROM CHESS PAGE AND WITH PERSONAL INFO DATA OBJECT MAKES NEW OBJECT TO SEND ON SERVER
    const obj2 = {
      experience_level: one,
      already_participated: three,
      character_id: two,
    };
    const dataFormated = JSON.stringify(obj2);
    localStorage.setItem("lika2", dataFormated);
    const dataforuse = JSON.parse(localStorage.getItem("lika2"));
    const obj1 = JSON.parse(localStorage.getItem("lika"));
    Object.assign(obj1, obj2);

    // POST API CALL
    const sendJSON = async function (url, data) {
      try {
        const fetchData = fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await fetchData;
        const resData = await res.json();
        return resData;
      } catch (err) {
        console.log(err);
      }
    };
    sendJSON(`https://chess-tournament-api.devtest.ge/api/register`, obj1);

    //////////////////////////////
    // GOES TO WELCOME PAGE AND CLEARS LOCAL STORAGE
    thirdPageContainer.classList.add("hidden");
    fourthPageContainer.classList.remove("hidden");
    if (!fourthPageContainer.classList.contains("hidden")) {
      localStorage.clear();
    }
  } else {
    // IF SOME INVALID INPUTS EXIST RENDERS ERR POP UP AND ADDS EVENT LISTENER TO REMOVE ON CLICK

    renderErrBox("Required field", "Please select all required fields");

    const errBoxCheck = document.querySelector(".error");

    errBoxCheck.addEventListener("click", function () {
      errBoxCheck.remove();
    });
  }
});

// ON PAGE REFRESH GETS DATA FROM LOCAL STORAGE AND RENDERS IT BACK
window.addEventListener("load", function () {
  // FIRST PAGE STORAGE, SECOND PAGE DATA STORAGE , ACTIVE CLASSES STORAGE
  const dataforuse = JSON.parse(localStorage.getItem("lika"));
  const dataforuse2 = JSON.parse(localStorage.getItem("lika2"));
  const dataforuse3 = JSON.parse(localStorage.getItem("lika3"));

  const labels = this.document.querySelectorAll("label");

  // CHECKS IF THERE IS ANY DATA
  if (dataforuse2) {
    // MAKES ARR FROM SECOND PAGE VALUES
    const arr = Object.values(dataforuse2);
    // CHECKS WHICH FIELD WAS FILLED AND RENDERS DATA
    if (arr[0] !== undefined) {
      levelListTitle.textContent = arr[0];
    }
    if (arr[2]) {
      if (arr[2] === 1) {
        const curLi = this.document.querySelector(".onee");
        curLi.classList.add("selected");
        characterListTitle.textContent = "Nona Gaphrindashvili";
      }
      if (arr[2] === 2) {
        const curLi = this.document.querySelector(".twoo");
        curLi.classList.add("selected");
        characterListTitle.textContent = "Mikhail Tal";
      }
      if (arr[2] === 3) {
        const curLi = this.document.querySelector(".three");
        curLi.classList.add("selected");
        characterListTitle.textContent = "Bobby Fisher";
      }
      if (arr[2] === 4) {
        const curLi = this.document.querySelector(".four");
        curLi.classList.add("selected");
        characterListTitle.textContent = "Magnus Carlsen";
      }
    }

    if (arr[1] === true) {
      radioYes.checked = true;
    }

    if (arr[1] === false) {
      radioNo.checked = true;
    }
  }

  // ADDS ACTIVE CLASSES FRO DROPDOWN LISTS
  if (dataforuse3) {
    if (dataforuse3[0]) {
      levelListTitle.classList.add(dataforuse3[0]);
    }

    if (dataforuse3[1]) {
      characterListTitle.classList.add(dataforuse3[1]);
    }
  }

  //FOR  PERSONAL INFO RENDERS USERS INPUT
  if (dataforuse) {
    inputOne.value = dataforuse.name;
    inputTwo.value = dataforuse.email;
    inputThree.value = dataforuse.phone;
    inputFour.value = Object.values(dataforuse)[3];
    labels.forEach((el) => el.remove());
  }
});
