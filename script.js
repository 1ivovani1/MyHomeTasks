let money = 2500000,
    income = "Фриланс",
    addExpenses = "Еда, квартира, ипотека",
    deposit = true,
    mission = 10000000,
    period = 4,
    budgetDay = money / 30;

console.log(typeof money,typeof income,typeof deposit);
console.log(income.length);
console.log(period,mission);
console.log(addExpenses.toLowerCase().split(", "));
console.log(budgetDay,money % 30);
