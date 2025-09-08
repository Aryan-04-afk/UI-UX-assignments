// 1
let a = parseFloat(prompt("Enter first number:"));
let b = parseFloat(prompt("Enter second number:"));
console.log("Sum: " + (a + b));
console.log("Difference: " + (a - b));
console.log("Product: " + a * b);
console.log("Quotient: " + a / b);

// 2
let arr = [12, 5, 8, 20, 3];
console.log("Largest: " + Math.max(...arr));
console.log("Smallest: " + Math.min(...arr));
console.log("Ascending: " + arr.slice().sort((a, b) => a - b));
console.log("Descending: " + arr.slice().sort((a, b) => b - a));

// 3
function validateForm(name, email, age) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name === "") return "Name required";
  if (!emailPattern.test(email)) return "Invalid email";
  if (isNaN(age) || age < 18 || age > 100) return "Invalid age";
  return "Valid";
}
console.log(validateForm("Aryan", "Negi@gmail.com", 25));
console.log(validateForm("", "Negi@gmail.com", 25));

// 4
let student = { name: "Aryan", age: 20, grades: "B" };
student.class = "10th";
student.grades = "A";
for (let key in student) {
  console.log(key + ": " + student[key]);
}

// 5
function processArray(arr) {
  let result = arr
    .filter((n) => n % 2 === 0)
    .map((n) => n * 2)
    .reduce((a, b) => a + b, 0);
  return result;
}
console.log(processArray([1, 2, 3, 4, 5, 6]));
