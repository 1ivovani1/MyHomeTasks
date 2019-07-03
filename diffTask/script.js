let num = 266219,
    numP = 1;

num = num.toString();

for (var i = 0; i < num.length; i++) {
  numP *= num[i];
}

console.log(numP);
console.log((numP**3).toString().slice(0,2));
