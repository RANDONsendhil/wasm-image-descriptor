"use strict";
let test = "null | string";
let element = document.getElementById("testId");
function myfunction(params) {
    if (element) {
        element.textContent = test;
        console.log(test);
    }
}
let mutiply = (params) => {
    console.log();
    return params * 10;
};
myfunction();
if (element) {
    let retval = mutiply(5);
    element.textContent = retval.toString();
}
var arr = [];
arr.push(1, 2, 3, 4, 5);
function get_array(params) {
    return arr;
}
let calculate = (params) => {
    return "hello";
};
function calcualte(params) {
    return "hello";
}
const displayPerson = (person) => {
    return `Name: ${person.name}, Age: ${person.age} `;
};
const person1 = { name: "Sendhil", age: 2, address: "Saint Jean de la Ruelle" };
const person2 = { name: "Marie", age: 2, address: "Saint Jean de la Ruelle" };
console.log(displayPerson(person1));
const getColorDefinition = {
    green: "Green is selected",
    blue: "Blue is selected",
    red: "Red is selected",
};
console.log(getColorDefinition["blue"]);
const users = [person1, person2];
const loggedInUserName = "sendhil";
const loggedInUser = users.find((u) => u.name.toLowerCase() === loggedInUserName);
console.log("==================> " + loggedInUserName);
console.log("==================> " + (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.name));
