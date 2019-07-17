const myDiv = document.querySelector('#center');
let nowDate = new Date(),
    centerValue;

const weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];

let daysToNewYear = () => {
  let nowYear = nowDate.getFullYear()
      deadline = `31 december ${nowYear}` ;
      dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      daysToNY = Math.floor(timeRemaining / 60 / 60 / 24);
      return `До нового года осталось ${daysToNY} дней`;
}

let dayTime = () => {
  let hours = nowDate.getHours();
    if (hours > 12 && hours <= 16) {
      return "Добрый день!";
    }
    if (hours > 16) {
      return "Добрый вечер!";
    }
    if (hours < 5) {
      return "Доброй ночи!";
    }
    if (hours >= 5 && hours <= 12 ) {
      return "Доброе утро!";
    }
}

let getCurrentTime = () => {
  let currentTime = nowDate.toLocaleTimeString('en');
  return `Текущее время: ${currentTime}`
}

let getDayOfTheWeek = () => {
  let weekDay = nowDate.getDay();
  return `Сегодня: ${weekDays[weekDay]}`;
}

centerValue = `${dayTime()}<br>${getDayOfTheWeek()}<br>${getCurrentTime()}<br>${daysToNewYear()}`

myDiv.innerHTML = centerValue;
