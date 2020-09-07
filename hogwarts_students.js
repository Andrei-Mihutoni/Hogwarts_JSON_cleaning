"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  console.log(jsonData);

  jsonData.forEach((jsonObject) => {
    const Student = {
      fullName: "",
      firstName: "",
      middleName: "unknown",
      lastName: "",
      nickName: "unknown",
      imageFileName: "",
      house: "",
    };

    // console.log(Student);

    // create prototype from JSON
    const student = Object.create(Student);
    const fullNameArray = jsonObject.fullname.trim().split(" ");
    const [firstName] = jsonObject.fullname.trim().split(" ");
    // console.log(firstName);

    student.firstName =
      firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
    // console.log(`First name: ${student.firstName}`);

    function middleName() {
      if (fullNameArray.length === 3) {
        let middleName = fullNameArray[1];
        middleName = middleName.replace(/"/g, "");
        middleName =
          middleName.charAt(0).toUpperCase() +
          middleName.substr(1).toLowerCase();
        // console.log(middleName);
        student.middleName = middleName;
        // console.log(student.middleName);
      }
    }
    middleName();

    // Last name:
    const fullName = jsonObject.fullname.trim().split(" ").toString();
    // console.log(fullName);
    const lastComma = fullName.lastIndexOf(",");
    // console.log(lastComma);
    const lastNameRaw = fullName.substring(lastComma + 1);
    // console.log(`Last name: ${lastNameRaw}`);

    student.lastName =
      lastNameRaw.charAt(0).toUpperCase() +
      lastNameRaw.substring(1).toLowerCase();
    // console.log(`Last name: ${lastName}`);

    //Gender:
    student.gender = jsonObject.gender;
    // console.log(`Gender: ${student.gender}`);

    student.house =
      jsonObject.house.trim().charAt(0).toUpperCase() +
      jsonObject.house.substr(1).toLowerCase();
    // console.log(`House: ${student.house}`);

    allStudents.push(student);
  });
  console.table(allStudents);
}
