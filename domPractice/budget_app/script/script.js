'use strict';

let start = document.querySelector('#start'),
    firstPlus = document.getElementsByTagName('button')[0],
    secondPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    incomeItems = document.querySelectorAll('.additional_income-item'),
    userBudgetMonth = document.querySelector('.salary-amount'),
    moreIncomeTitle = document.querySelector('.income-title'),
    moreIncomeAmount = document.querySelector('.income-amount'),
    expencesTitle = document.querySelector('.expenses-title'),
    expencesAmount = document.querySelector('.expenses-amount'),
    expencesItem = document.querySelectorAll('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelector = document.querySelector('.period-select');

let budgetDay = document.querySelector('.budget_day-value'),
    budgetMonth = document.querySelector('.budget_month-value'),
    expencesMonth = document.querySelector('.expences_month-value'),
    accumulatedMonth = document.querySelector('.accumulated_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpenses = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    target_month = document.querySelector('.target_month-value');
