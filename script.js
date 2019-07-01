'use strict';

let mission = 1000000;

let money = prompt("Ваш месячный доход?"),
    addExpences = prompt("Перечислите возможные расходы за рассчитываемый период через запятую").split(','),
    deposit = confirm('Есть ли у вас депозит в банке?');

console.log(addExpences);

console.log(typeof money,typeof addExpences,typeof deposit);

let monthLose = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    monthAmount = +prompt("Во сколько это обойдется?");
let monthLose1 = prompt("Какие обязательные ежемесячные расходы у вас есть?"),
    monthAmount1 = +prompt("Во сколько это обойдется?");

let budgetMonth = money - (monthAmount + monthAmount1);
console.log(budgetMonth);

console.log(Math.round(mission/budgetMonth));

let budgetDay = Math.floor(budgetMonth/30);

if (budgetDay > 800) {
   console.log('Высокий уровень дохода');
}else if(budgetDay > 300 && budgetDay <= 800){
    console.log('Средний уровень дохода');
}else if(budgetDay <= 300 && budgetDay >= 0){
  console.log('Низкий уровень дохода');
}else{
  console.log('Что-то пошло не так');
}
