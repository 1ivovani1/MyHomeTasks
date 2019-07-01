'use strict';
let lang = "en";
let days = document.getElementById('days');

if (lang == "ru") {
  days.innerHTML = "<li>Понедельник</li><li>Вторник</li><li>Среда</li><li>Четверг</li><li>Пятница</li><li>Суббота</li><li>Воскресенье</li>"
}else if (lang == "en") {
  days.innerHTML = "<li>Monday</li><li>Tuesday</li><li>Wednesday</li><li>Thirsday</li><li>Friday</li><li>Saturday</li><li>Sunday</li>"
}

switch(lang){
  case "ru":
    days.innerHTML = "<li>Понедельник</li><li>Вторник</li><li>Среда</li><li>Четверг</li><li>Пятница</li><li>Суббота</li><li>Воскресенье</li>"
    break;
  case "en":
    days.innerHTML = "<li>Monday</li><li>Tuesday</li><li>Wednesday</li><li>Thirsday</li><li>Friday</li><li>Saturday</li><li>Sunday</li>"
    break;
}

let cases = [
    ["<li>Monday</li><li>Tuesday</li><li>Wednesday</li><li>Thirsday</li><li>Friday</li><li>Saturday</li><li>Sunday</li>","<li>Понедельник</li><li>Вторник</li><li>Среда</li><li>Четверг</li><li>Пятница</li><li>Суббота</li><li>Воскресенье</li>"],
    ['en','ru']
  ];

  days.innerHTML = cases[0][cases[1].indexOf(lang)];


let namePerson = "Артем";
let whois,
    result = (namePerson === "Артем" && namePerson !== "Максим") ? console.log('Директор') : whois = '',
    result1 = (namePerson === "Максим" && namePerson !== "Артем") ? console.log('Преподаватель') : whois = '',
    result2 = (namePerson !== "Максим" && namePerson !== "Артем") ? console.log('Студент') : whois = '';
