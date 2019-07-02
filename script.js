'use strict';

let mission = 1000000,
    income = "Фриланс",
    money = prompt("Ваш месячный доход?"),
    addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую").split(','),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    period = 3;

let showTypeOf = function(item){
  console.log(item,typeof item);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let monthLose = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    monthAmount = +prompt("Во сколько это обойдется?");
let monthLose1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    monthAmount1 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - (monthAmount + monthAmount1);
let budgetDay = Math.floor(budgetMonth / 30);


function getStatusIncome(){
    if (budgetDay > 800) {
       return('Высокий уровень дохода');
    }else if(budgetDay > 300 && budgetDay <= 800){
        return('Средний уровень дохода');
    }else if(budgetDay <= 300 && budgetDay >= 0){
      return('Низкий уровень дохода');
    }else{
      return('Что-то пошло не так');
    }
}


function getExpensesMonth(){
  return monthAmount + monthAmount1
}

let accumulatedMonth =  function getAccumulatedMonth(){
  return money - (monthAmount + monthAmount1)
}

function getTargetMonth(){
  return Math.floor(mission/budgetMonth)
}

console.log("You'll reach your target in " + getTargetMonth() + " months");
console.log("За " + period + " месяца вы накопите - " + budgetMonth * period + " деняк");
