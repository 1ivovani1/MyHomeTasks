'use strict';

let mission = 1000000,
    money,
    income = "Фриланс",
    addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую").split(','),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    period = 3;

let start = function(){    //Функция валидации ввода дохода
  do{
    money = prompt("Ваш месячный доход?");
  }while(isNaN(money) || money === "" || money === null);
}

start();


let monthLose1,
    monthLose2;

let expencesMonth = function(){ // Функция получения уровня затрат в месяц
  let sum = 0,promptSum;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      do{
        monthLose1 = prompt("Какие обязательные ежемесячные расходы у вас есть?1");
      }while(monthLose1 === "" || monthLose1 === null);
      while(isNaN(promptSum) || promptSum === "" || promptSum === null){
          promptSum = +prompt("Во сколько это обойдется?",2500);
          sum+= promptSum;
      }
      promptSum = null;
    }else if(i === 1){
      do{
          monthLose2 = prompt("Какие обязательные ежемесячные расходы у вас есть?2");
        }while(monthLose2 === "" || monthLose2 === null);
      while(isNaN(promptSum) || promptSum === "" || promptSum === null){
          promptSum = +prompt("Во сколько это обойдется?",2500);
          sum+= promptSum;
        }
      }
    }
  return sum;
}

let expencesAmount = expencesMonth();

let accumulatedMonth =  function getAccumulatedMonth(){ //Функция возвращающая прибыль в месяц
  if ((money - expencesAmount) < 0) {
    return 0;
  }else{
    return money - expencesAmount;
  }
}

let budgetDay = function(){//Функция возвращающая дневную прибыль
  if (accumulatedMonth() === 0) {
    return -1;
  }else{
    return Math.floor(accumulatedMonth() / 30);
  }
};


function getStatusIncome(){//Функция определяющая уровень дохода
    if (budgetDay() > 800) {
       return('Высокий уровень дохода');
    }else if(budgetDay() > 300 && budgetDay() <= 800){
        return('Средний уровень дохода');
    }else if(budgetDay() <= 300 && budgetDay() >= 0){
      return('Низкий уровень дохода');
    }else{
      return('Что-то пошло не так');
    }
}

console.log(getStatusIncome());


function getTargetMonth(){//Функция возвращающая число ммесяцев через которое цель будет достигнута
  let targetMonth = Math.floor(mission / accumulatedMonth());
  if (targetMonth < 0 || isNaN(targetMonth) || targetMonth === Infinity) {
    return "Цель не будет достигнута";
  }else{
    return "You'll reach your target in " + targetMonth + " months";
  }
}

console.log(getTargetMonth());
console.log("За " + period + " месяца вы накопите - " + accumulatedMonth() * period + " деняк");
