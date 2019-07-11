'use strict';

let start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    firstPlus = document.getElementsByTagName('button')[0],
    secondPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    incomeItems = document.querySelectorAll('.additional_income-item'),
    userBudgetMonth = document.querySelector('.salary-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll(".expenses-items"),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    accumulatedMonthValue = document.querySelector('.accumulated_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value');

    let appData = {
      income:{},
      budget:0,
      addIncome:[],
      incomeMonth:0,
      expences:{},
      addExpenses:[],
      deposit:false,
      percentDeposit:0,
      moneyDeposit:0,
      budgetDay:0,
      budgetMonth:0,
      expencesMonth:0,
      beforeStart:function(){
        if (userBudgetMonth.value !== '') {
          appData.start();
          }
      },
      start:function(){
        this.budget = +userBudgetMonth.value;
        this.getExpenses();
        this.getIncome();
        this.getAccumulatedMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        let disabledInputs = document.querySelectorAll('input');
        disabledInputs.forEach(function(item){
          if (!item.hasAttribute("disabled")){
            item.setAttribute("disabled",'');
          }
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
      },
      addExpencesBlock:function(){
          let clonedExpensesItem = expensesItems[0].cloneNode(true);
            clonedExpensesItem.querySelector('.expenses-title').value = '';
            clonedExpensesItem.querySelector('.expenses-amount').value = '';
            expensesItems[0].parentNode.insertBefore(clonedExpensesItem,secondPlus);
            expensesItems = document.querySelectorAll(".expenses-items");
            sumInp = document.querySelectorAll('input[placeholder="Сумма"]').forEach(function(item){
              item.addEventListener('keypress',function(e){
                item.value = item.value.replace (/[^\d,]/g, '');
              })
            });
          if (expensesItems.length === 3) {
            secondPlus.style.display = "none";
          }},
      addIncomeBlock:function(){
        let clonedIncomeItem = incomeItem[0].cloneNode(true);
            clonedIncomeItem.querySelector('.income-title').value = '';
            clonedIncomeItem.querySelector('.income-amount').value = '';
            incomeItem[0].parentNode.insertBefore(clonedIncomeItem,firstPlus);
            incomeItem = document.querySelectorAll('.income-items');
            nameInp = document.querySelectorAll('input[placeholder="Наименование"]').forEach(function(item){
              item.addEventListener('keypress',function(e){
                item.value = item.value.replace (/^[A-Za-z0-9]+$/, '');
              })
            })
        if (incomeItem.length === 3) {
          firstPlus.style.display = 'none';
        }
      },
      getAccumulatedMonth:function(){ //Функция возвращающая прибыль в месяц
         if((this.budget - this.getExpenses()) < 0) {
          return 0;
        }else{
          this.budgetMonth = this.budget + this.incomeMonth - this.getExpenses();
        }
      },
      getBudget:function(){
        if (this.getAccumulatedMonth() <= 0) {
          return -1;
        }else{
          this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
      },
      calcPeriod:function(){
        return this.budgetMonth * periodSelect.value
      },
      getStatusIncome:function(){//Функция определяющая уровень дохода
          if (this.budgetDay > 800) {
             return('Высокий уровень дохода');
          }else if(this.budgetDay > 300 && this.budgetDay <= 800){
              return('Средний уровень дохода');
          }else if(this.budgetDay <= 300 && this.budgetDay >= 0){
            return('Низкий уровень дохода');
          }else{
            return('Что-то пошло не так');
          }
      },
      getTargetMonth:function(){//Функция возвращающая число ммесяцев через которое цель будет достигнута
        return Math.round(targetAmount.value / this.budgetMonth);
      },
      getInfoDeposit:function(){
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if (this.deposit) {
          do {
            this.percentDeposit = prompt("Какой годовой процент?","10");
          } while (this.percentDeposit === "" || this.percentDeposit === null);
          do {
            this.moneyDeposit = prompt("Какая сумма заложена?",10000);
          } while (this.moneyDeposit === "" || this.moneyDeposit === null);
        }
      },//Получаем инфу по депозиту пользователя
      calcSavedMoney:function(){
        return this.budgetMonth * this.period
      },
      getExpenses:function(){
        let sum = 0;
        expensesItems.forEach(function(item){
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = +item.querySelector('.expenses-amount').value;
          if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expences[itemExpenses] = cashExpenses;
            sum+= cashExpenses;
          }
        });
        this.expencesMonth = sum;
        return sum
      },
      periodChange:function(){
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
      },
      getIncome:function(){
        let sum = 0;
        incomeItem.forEach(function(item){
          let itemIncome = item.querySelector('.income-title').value;
          let cashIncome = +item.querySelector('.income-amount').value;
          if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
            sum+= cashIncome;
          }
        });
        this.incomeMonth = sum;
        return sum

      },
      showResult:function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expencesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
      },
      getAddExpenses:function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== '') {
            appData.addExpenses.push(item);
          }
        })
      },
      getAddIncome:function(){
         incomeItems.forEach(function(item){
           let itemValue = item.value.trim();
           if (itemValue !== '') {
             appData.addIncome.push(itemValue);
           }
         })
      },
      reset:function(){
         let allInputs = document.querySelectorAll('input');
         allInputs.forEach(function(item){
              item.value = ''
        })
         start.style.display = 'block';
         cancel.style.display = 'none';
      }
    }
    appData.beforeStart.call(appData);
    //-----------------------------------------------------------------------------------------------//
    start.addEventListener('click',appData.beforeStart);
    cancel.addEventListener('click',appData.reset)
    firstPlus.addEventListener('click',appData.addIncomeBlock);
    secondPlus.addEventListener('click',appData.addExpencesBlock);
    periodSelect.addEventListener('change',appData.periodChange);
    let sumInp = document.querySelectorAll('input[placeholder="Сумма"]').forEach(function(item){
      item.addEventListener('keypress',function(e){
        item.value = item.value.replace (/[^\d,]/g, '');
      })
    });
    let nameInp = document.querySelectorAll('input[placeholder="Наименование"]').forEach(function(item){
      item.addEventListener('keypress',function(e){
        item.value = item.value.replace (/^[A-Za-z0-9]+$/, '');
      })
    })
    //-----------------------------------------------------------------------------------------------//
