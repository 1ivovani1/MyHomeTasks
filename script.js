'use strict';

let appData = {
  income:{},
  addIncome:[],
  expences:{},
  addExpences:[],
  deposit:false,
  percentDeposit:0,
  moneyDeposit:0,
  mission:1000000,
  period:3,
  budgetDay:0,
  budgetMonth:0,
  expencesMonth:0,
  asking:function(){

    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome,cashIncome;
      do{
       itemIncome = prompt("Какой у вас дополнительный заработок?","Таксую");
    }while(itemIncome === "" || itemIncome === null);
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?","10000");
      } while (cashIncome === "" || cashIncome === null || isNaN(cashIncome));
      appData.income[itemIncome] = cashIncome;
      appData.addIncome = itemIncome.toLowerCase().split(',');
    }

    let addExpences;

    do {
       addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую","Дом,Машина,Семья");
    } while (addExpences === "" || addExpences === null);
        appData.addExpences = addExpences.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getInfoDeposit();
//--------------------------------------------------------------------
        let sum = 0,promptSum;
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            do{
              appData.expences["Ответ на первый вопрос"] = prompt("Какие обязательные ежемесячные расходы у вас есть?1","q1");
            }while(appData.expences["Ответ на первый вопрос"] === "" || appData.expences["Ответ на первый вопрос"] === null);
            while(isNaN(promptSum) || promptSum === "" || promptSum === null){
                promptSum = prompt("Во сколько это обойдется?",2500);
                sum+= Number(promptSum);
            }
            promptSum = null;
          }else if(i === 1){
            do{
                appData.expences["Ответ на второй вопрос"] = prompt("Какие обязательные ежемесячные расходы у вас есть?2","q2");
              }while(appData.expences["Ответ на второй вопрос"] === "" || appData.expences["Ответ на второй вопрос"] === null);
            while(isNaN(promptSum) || promptSum === "" || promptSum === null){
                promptSum = prompt("Во сколько это обойдется?",2500);
                sum+= Number(promptSum);
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
      appData.budgetMonth = appData.budget - expencesAmount;
      return appData.budget - expencesAmount;
    }
  },
  getBudget:function(){
    if (accumulatedMonth <= 0) {
      return -1;
    }else{
      appData.budgetDay = Math.floor(accumulatedMonth / 30);
    }
  },
  getStatusIncome:function(){//Функция определяющая уровень дохода
      if (appData.budgetDay > 800) {
         return('Высокий уровень дохода');
      }else if(appData.budgetDay > 300 && appData.budgetDay <= 800){
          return('Средний уровень дохода');
      }else if(appData.budgetDay <= 300 && appData.budgetDay >= 0){
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
  },
  getInfoDeposit:function(){
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?","10");
      } while (appData.percentDeposit === "" || appData.percentDeposit === null);
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?",10000);
      } while (appData.moneyDeposit === "" || appData.moneyDeposit === null);
    }
  },//Получаем инфу по депозиту пользователя
  calcSavedMoney:function(){
    return appData.budgetMonth * appData.period
  }
}
//-----------------------------------------------------------------------------------------------//


let start = function(){    //Функция валидации ввода дохода
  do{
    appData.budget = prompt("Ваш месячный доход?","90000");
  }while(isNaN(appData.budget) || appData.budget === "" || appData.budget === null);
}
start();

let expencesAmount = appData.asking();
let accumulatedMonth = appData.getAccumulatedMonth();
let getBudget = appData.getBudget();

console.log("Ваши месячные расходы составляют: " + appData.expencesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

function upperCase(arr){
  arr.forEach(function(item,i){
    item = item[0].toUpperCase() + item.substr(1);
    arr[i] = item;
  });
  return  arr.join(", ");
}
console.log("Ваши возможные расходы это - " + upperCase(appData.addExpences));
console.log("Ваши возможные доходы это - " + upperCase(appData.addIncome));

//-----------------------------------------------------------------------------------------------//
let appDataTypes = [];
for (let key in appData) {
  appDataTypes.push(key);
}
console.log("Наша программа включает в себя:\n    " + appDataTypes.join("\n    "));
