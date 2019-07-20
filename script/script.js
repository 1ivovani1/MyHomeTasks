window.addEventListener('DOMContentLoaded',function() {
    'use strict';

    //Таймер
    const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    let dateNow = new Date(),
        nextDay = `${dateNow.getUTCDate() + 1} ${months[dateNow.getUTCMonth()]} ${dateNow.getUTCFullYear()}`;
    const countTimer = (deadline) => {
       let dateNow1 = new Date(),
           nextDay1 = `${dateNow1.getUTCDate() + 2} ${months[dateNow1.getUTCMonth()]} ${dateNow1.getUTCFullYear()}`;
      let timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

      function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNoww = new Date().getTime(),
            timeRemaining = (dateStop - dateNoww) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            hours.toString().length === 1 ? hours = "0" + hours.toString() : hours = hours;
            minutes.toString().length === 1 ? minutes = "0" + minutes.toString() : minutes = minutes;
            seconds.toString().length === 1 ? seconds = "0" + seconds.toString() : seconds = seconds;

            return {timeRemaining, hours, minutes, seconds};
      }

        let timer = getTimeRemaining();
        if (timer.timeRemaining < 0) {
            clearInterval(timerInterval);
            timerInterval = setInterval(countTimer,1000,nextDay1);
        }
        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

    }
    let timerInterval = setInterval(countTimer,1000,nextDay);

    //Меню
    const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

      const handlerMenu = () => {
        menu.classList.toggle('active-menu')
      }

      btnMenu.addEventListener('click',handlerMenu);
      closeBtn.addEventListener('click',handlerMenu);
      menuItems.forEach((item) => item.addEventListener('click',handlerMenu));
    }
    toggleMenu();

    // Поп-ап окно
    const togglePopup = () => {
      const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

      let count = 0,
          animInterval;



      popupBtn.forEach((item) => {
          item.addEventListener('click', () => {
            if (window.innerWidth > 1350) {
              popupContent.style = `position:absolute;top:0`
              popup.style.display = `block`;
              animInterval = requestAnimationFrame(popupAnim);
            }else{
              popup.style.display = `block`;
            }
        })
      });
      popupClose.addEventListener('click', () => {
        popup.style.display = `none`;
        togglePopup();
      });

      const popupAnim = () => {
        let height = popupContent.getBoundingClientRect().height;
        animInterval = requestAnimationFrame(popupAnim);
        count += 1.5;
        if ((window.innerHeight / 2 - height / 2) > count) {
          popupContent.style.top = `${count}px`;
        }else{
          cancelAnimationFrame(popupAnim);
        }
      }

    }
    togglePopup();

});
