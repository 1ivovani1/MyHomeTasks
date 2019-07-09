'use strict';

 let now = new Date(),
     date = now.getDate().toString(),
     month = now.getMonth().toString(),
     year = now.getFullYear().toString(),
     hours = now.getHours().toString(),
     minutes = now.getMinutes().toString(),
     seconds = now.getSeconds().toString();

function plusNull(time){
  if (time.length === 1) {
    return time = "0" + time;
  }
}
hours = plusNull(hours);
date = plusNull(date);
month = plusNull(month);

document.write(hours + ":" + minutes + ":" + seconds + "     "  + date + "." + month + "." + year);
