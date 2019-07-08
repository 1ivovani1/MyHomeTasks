'use strict';

let book = document.querySelectorAll(".book"),
    bookWrapper = document.querySelector(".books"),
    body = document.querySelector("body");


bookWrapper.insertBefore(book[1],book[0]);
bookWrapper.insertBefore(book[4],book[2]);
bookWrapper.insertBefore(book[4],book[2]);
bookWrapper.insertBefore(book[3],book[2]);
bookWrapper.insertBefore(book[5],book[2]);

body.style.background = "url('image/you-dont-know-js.jpg') center no-repeat";
body.removeChild(document.querySelector(".adv"));

let titles = document.querySelectorAll(".book h2 a");
titles[2].textContent = "Книга 3. this и Прототипы Объектов";

let uls = document.querySelectorAll(".book ul");
uls[1].innerHTML = "<li>Введение</li><li>Предисловие</li><li>Глава 1: Что такое область видимости?</li><li>Глава 2: Лексическая область видимости</li><li>Глава 3: Область видимости: функции против блоков</li><li>Глава 4: Поднятие переменных (Hoisting)</li><li>Глава 5: Замыкание области видимости</li><li>Приложение A: Динамическая область видимости</li><li>Приложение B: Полифиллинг блочной области видимости</li><li>Приложение C: Лексический this</li><li>Приложение D: Благодарности!</li>"
uls[4].innerHTML = "<li>Введение</li><li>Предисловие</li><li>Глава 1: Асинхронность: Сейчас и Тогда</li><li>Глава 2: Колбеки</li><li>Глава 3: Обещания</li><li>Глава 4: Генераторы</li><li>Глава 5: Производительность программы</li><li>Глава 6: Бенчмаркинг и настройка</li><li>Приложение A: Библиотека: asynquence</li><li>Приложение B: Расширенные асинхронные шаблоны</li><li>Приложение C: Благодарности!</li>"

let the8th = document.createElement("li");
the8th.innerHTML = "Глава 8: За пределами ES6";
uls[5].appendChild(the8th);
let lis = document.querySelectorAll(".book:nth-child(6) ul li");
uls[5].insertBefore(the8th,lis[9])
