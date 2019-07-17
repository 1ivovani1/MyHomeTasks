window.addEventListener('DOMContentLoaded',function() {
    'use strict';

    function countTimer(deadline){
      let timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

      function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            hours.toString().length === 1 ? hours = "0" + hours.toString() : hours = hours;
            minutes.toString().length === 1 ? minutes = "0" + minutes.toString() : minutes = minutes;
            seconds.toString().length === 1 ? seconds = "0" + seconds.toString() : seconds = seconds;



            return {timeRemaining, hours, minutes, seconds};
      }

      function updateClock(){
        let timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if (timer.timeRemaining < 0) {
          clearInterval(timerInterval);
          timerHours.textContent = "00";
          timerMinutes.textContent = "00";
          timerSeconds.textContent = "00";
        }
      }

      updateClock();
    }

    let timerInterval = setInterval(countTimer,1000,'18 july 2019');

});
