//CRUD

var arr = ["1", true, 123, "string"];

console.log(arr);
console.log(arr[1]);
console.log(arr.length);
arr.push("E");
console.log(arr);

var i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

arr.sort();
console.log(arr);
