'use strict';

let appData = {
  income:{},
  addIncome:[],
  expences:{},
  addExpences:[],
  deposit:false,
  mission:1000000,
  period:3,
  budgetDay:0,
  budgetMonth:0,
  expencesMonth:0,
  asking:function(){
    let addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpences = addExpences.toLowerCase().split(',')
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
//--------------------------------------------------------------------
        let sum = 0,promptSum;
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            do{
              appData.expences["Ответ на первый вопрос"] = prompt("Какие обязательные ежемесячные расходы у вас есть?1");
            }while(appData.expences["Ответ на первый вопрос"] === "" || appData.expences["Ответ на первый вопрос"] === null);
            while(isNaN(promptSum) || promptSum === "" || promptSum === null){
                promptSum = +prompt("Во сколько это обойдется?",2500);
                sum+= promptSum;
            }
            promptSum = null;
          }else if(i === 1){
            do{
                appData.expences["Ответ на второй вопрос"] = prompt("Какие обязательные ежемесячные расходы у вас есть?2");
              }while(appData.expences["Ответ на второй вопрос"] === "" || appData.expences["Ответ на второй вопрос"] === null);
            while(isNaN(promptSum) || promptSum === "" || promptSum === null){
                promptSum = +prompt("Во сколько это обойдется?",2500);
                sum+= promptSum;
              }
            }
          }
        appData.expencesMonth = sum;
        return sum
//--------------------------------------------------------------------
  },
  getAccumulatedMonth:function(){ //Функция возвращающая прибыль в месяц
     if((appData.budget - expencesAmount) < 0) {
      return 0;
    }else{
      return appData.budget - expencesAmount;
    }
  },
  getStatusIncome:function(){//Функция определяющая уровень дохода
      if (budgetDay() > 800) {
         return('Высокий уровень дохода');
      }else if(budgetDay() > 300 && budgetDay() <= 800){
          return('Средний уровень дохода');
      }else if(budgetDay() <= 300 && budgetDay() >= 0){
        return('Низкий уровень дохода');
      }else{
        return('Что-то пошло не так');
      }
  },
  getTargetMonth:function(){//Функция возвращающая число ммесяцев через которое цель будет достигнута
    let targetMonth = Math.floor(appData.mission / accumulatedMonth);
    if (targetMonth < 0 || isNaN(targetMonth) || targetMonth === Infinity) {
      return "Цель не будет достигнута";
    }else{
      return "Вы достигните своей цели через " + targetMonth + " месяцев";
    }
  }
}

let start = function(){    //Функция валидации ввода дохода 
  do{
    appData.budget = prompt("Ваш месячный доход?");
  }while(isNaN(appData.budget) || appData.budget === "" || appData.budget === null);
}
start();

let expencesAmount = appData.asking();
let accumulatedMonth = appData.getAccumulatedMonth();

let budgetDay = function(){//Функция возвращающая дневную прибыль
  if (accumulatedMonth === 0) {
    return -1;
  }else{
    return Math.floor(accumulatedMonth / 30);
  }
};

console.log("Ваши месячные расходы составляют: " + appData.expencesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

let appDataTypes = [];
for (let key in appData) {
  appDataTypes.push(key);
}
console.log("Наша программа включает в себя:\n    " + appDataTypes.join("\n    "));
