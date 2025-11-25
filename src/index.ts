let test: string = "null | string";
let element = document.getElementById("testId");
function myfunction(params: void) {
  if (element) {
    element.textContent = test;
    console.log(test);
  }
}

let mutiply = (params: number) => {
  console.log();
  return params * 10;
};
myfunction();

if (element) {
  let retval: number = mutiply(5);
  element.textContent = retval.toString();
}

var arr: number[] = [];

arr.push(1, 2, 3, 4, 5);
function get_array(params: number[]) {
  return arr;
}

let calculate = (params: string): string => {
  return "hello";
};

function calcualte(params: string): string {
  return "hello";
}

interface Person<T> {
  name: T;
  age: number;
  address: T;
}

const displayPerson = <T>(person: Person<T>): string => {
  return `Name: ${person.name}, Age: ${person.age} `;
};

const person1 = { name: "Sendhil", age: 2, address: "Saint Jean de la Ruelle" };
const person2 = { name: "Marie", age: 2, address: "Saint Jean de la Ruelle" };
console.log(displayPerson(person1));

type color = "green" | "blue" | "red";

const getColorDefinition: Record<color, string> = {
  green: "Green is selected",
  blue: "Blue is selected",
  red: "Red is selected",
};

console.log(getColorDefinition["blue"]);
const users = [person1, person2];
const loggedInUserName: string = "sendhil";

const loggedInUser = users.find(
  (u) => u.name.toLowerCase() === loggedInUserName
);
console.log("==================> " + loggedInUserName);
console.log("==================> " + loggedInUser?.name);
