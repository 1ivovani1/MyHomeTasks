'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);


import timer from './modules/countTimer';
import menu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import photoChange from './modules/photoChange';
import myCalc from './modules/calc';
import sendForm from './modules/ajax';
import validate from './modules/inputsValid';


//Таймер
timer();

//Меню
menu();

// Поп-ап окно
togglePopup();

//табы
tabs();

//слайдер
slider();

//работа с командой
photoChange();

//калькулятор
myCalc()

//send-ajax-form
sendForm();

//inputs validate
validate();
