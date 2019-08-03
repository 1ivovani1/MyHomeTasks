//Таймер

const timer = () => {
const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
let dateNow = new Date(),
    nextDay = `${dateNow.getUTCDate() + 1} ${months[dateNow.getUTCMonth()]} ${dateNow.getUTCFullYear()}`;
const countTimer = (deadline) => {
   let dateNow1 = new Date(),
       nextDay1 = `${dateNow1.getUTCDate() + 2} ${months[dateNow1.getUTCMonth()]} ${dateNow1.getUTCFullYear()}`;
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

  const getTimeRemaining = () => {
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
}

export default timer;
