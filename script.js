'use strict';

let week = ["Monday","Tuesday","Wednesday","Thirsday","Friday","Saturday","Sunday"],
    li = document.getElementsByTagName('li'),
    nowDate = new Date();


week.forEach(function(item,i){
  if ((i+1) == nowDate.getDay()) {
    li[i].style.fontWeight = 'bolder';
  }
  if (item == "Saturday" || item == "Sunday") {
    li[i].style.fontStyle = "italic";
  }
  li[i].innerHTML = week[i];
 });
