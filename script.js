'use strict';

let arr = ["829291374","289284739","5423432","4930430349","21291291","483430","121012932"];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].slice(0,1) == 2 || arr[i].slice(0,1) == 4) {
        console.log(arr[i]);
      }
    }

myLoop:
for (var i = 2; i <= 100; i++) {

  for (var j = 2; j < i; j++) {
    if (i % j == 0) continue myLoop;
  }
  console.log("Простое число - " + i + "\tЕго делители - 1," + i);
}
