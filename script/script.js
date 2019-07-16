'use strict';

const start = document.querySelector('#start'),
    cancel = document.querySelector('#cancel'),
    firstPlus = document.getElementsByTagName('button')[0],
    secondPlus = document.getElementsByTagName('button')[1],
    pluses = document.querySelectorAll('button'),
    depositCheck = document.querySelector('#deposit-check'),
    incomeItems = document.querySelectorAll('.additional_income-item'),
    userBudgetMonth = document.querySelector('.salary-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll(".expenses-items");


const budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    accumulatedMonthValue = document.querySelector('.accumulated_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value');

    class AppData{
      constructor(){
        this.income = {};
        this.budget = 0;
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expences = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expencesMonth = 0;
      }
      beforeStart(){
        if (userBudgetMonth.value !== '') {
            this.start();
          }
      }
      start(){
        this.budget = +userBudgetMonth.value;
        this.getExpenses();
        this.getIncome();
        this.getAccumulatedMonth();
        this.getAdd('expenses');
        this.getAdd('income');
        this.getInfoDeposit();
        this.getBudget();

        this.showResult();

        let disabledInputs = document.querySelectorAll('input');
        disabledInputs.forEach((item) => {
          if (!item.hasAttribute("disabled") || item.getAttribute('type') !== 'range'){
            item.setAttribute("disabled",'');
          }
        });

        start.style.display = 'none';
        cancel.style.display = 'block';
      }
      addBlock(e){
        if (e.target === pluses[0]) {
          let clonedIncomeItem = incomeItem[0].cloneNode(true);
              clonedIncomeItem.querySelector('.income-title').value = '';
              clonedIncomeItem.querySelector('.income-amount').value = '';
              incomeItem[0].parentNode.insertBefore(clonedIncomeItem,firstPlus);
              incomeItem = document.querySelectorAll('.income-items');
              document.querySelectorAll('input[placeholder="Наименование"]').forEach((item)=> {
                item.addEventListener('keyup',() => {
                  item.value = item.value.replace (/^[A-Za-z0-9]+$/, '');
                })
              })
              document.querySelectorAll('input[placeholder="Сумма"]').forEach((item) => {
                item.addEventListener('keyup',() => {
                  item.value = item.value.replace (/[^\d,]/g, '');
                })
              });
          if (incomeItem.length === 3) {
            firstPlus.style.display = 'none';
          }
        }else{
          let clonedExpensesItem = expensesItems[0].cloneNode(true);
            clonedExpensesItem.querySelector('.expenses-title').value = '';
            clonedExpensesItem.querySelector('.expenses-amount').value = '';
            expensesItems[0].parentNode.insertBefore(clonedExpensesItem,secondPlus);
            expensesItems = document.querySelectorAll(".expenses-items");
            document.querySelectorAll('input[placeholder="Сумма"]').forEach((item) => {
              item.addEventListener('keyup',() => {
                item.value = item.value.replace (/[^\d,]/g, '');
              })
            });
            document.querySelectorAll('input[placeholder="Наименование"]').forEach((item)=> {
              item.addEventListener('keyup',() => {
                item.value = item.value.replace (/^[A-Za-z0-9]+$/, '');
              })
            })
          if (expensesItems.length === 3) {
            secondPlus.style.display = "none";
          }}
        }
      getAccumulatedMonth(){
         if((this.budget - this.getExpenses()) < 0) {
          return 0;
        }else{
          this.budgetMonth = this.budget + this.incomeMonth - this.getExpenses() + (this.moneyDeposit * this.percentDeposit)/12;
        }
      }
      getBudget(){
        if (this.getAccumulatedMonth() <= 0) {
          return -1;
        }else{
          this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
      }
      calcPeriod(){
        return this.budgetMonth * periodSelect.value
      }
      getTargetMonth(){
        return Math.round(targetAmount.value / this.budgetMonth);
      }
      getInfoDeposit(){
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
      }
      calcSavedMoney(){
        return this.budgetMonth * this.period
      }
      getExpenses(){
        let sum = 0;
        expensesItems.forEach((item) => {
          let itemExpenses = item.querySelector('.expenses-title').value;
          let cashExpenses = +item.querySelector('.expenses-amount').value;
          if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expences[itemExpenses] = cashExpenses;
            sum+= cashExpenses;
          }
        });
        this.expencesMonth = sum;
        return sum
      }
      periodChange(){
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
      }
      getIncome(){
        let sum = 0;
        incomeItem.forEach((item) => {
          let itemIncome = item.querySelector('.income-title').value;
          let cashIncome = +item.querySelector('.income-amount').value;
          if (itemIncome !== '' && cashIncome !== '') {
            appData.income[itemIncome] = cashIncome;
            sum+= cashIncome;
          }
        });
        this.incomeMonth = sum;
        return sum

      }
      showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expencesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
      }
      getAdd(type){
        if (type === 'expenses') {
          let addExpenses = additionalExpensesItem.value.split(',');
          addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
              appData.addExpenses.push(item);
            }
          })
        }else{
          incomeItems.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
              appData.addIncome.push(itemValue);
            }
          })
        }
      }
      reset(){
         let allInputs = document.querySelectorAll('input');
         allInputs.forEach((item) => {
              item.value = '';
              item.removeAttribute('disabled');
        })
         periodSelect.value = 1;
         periodAmount.textContent = 1;
         incomePeriodValue.value = 0;
         this.budgetMonth = 0;

         start.style.display = 'block';
         cancel.style.display = 'none';
      }
      eventsListener(){
        start.addEventListener('click',appData.beforeStart.bind(appData));
        cancel.addEventListener('click',appData.reset.bind(appData));
        firstPlus.addEventListener('click',appData.addBlock);
        secondPlus.addEventListener('click',appData.addBlock);
        periodSelect.addEventListener('change',appData.periodChange);
        depositCheck.addEventListener('change',() => {
          if (depositCheck.checked) {
              depositBank.style.display = 'inline-block';
              depositAmount.style.display = 'inline-block';
              appData.deposit = true;
              depositBank.addEventListener('change',function(){
                let selectIndex = this.options[this.selectedIndex].value;
                if (selectIndex === 'other') {
                  depositPercent.style.display = 'inline-block';
                  depositPercent.value = '';
                }else{
                  depositPercent.style.display = 'none';
                  depositPercent.value = selectIndex;
                }
              })
          }else{
              depositBank.style.display = 'none';
              depositAmount.style.display = 'none';
              depositAmount.value = '';
              this.deposit = false;
          }
        })
        document.querySelectorAll('input[placeholder="Сумма"]').forEach((item) => {
          item.addEventListener('keyup',() => {
            item.value = item.value.replace (/[^\d,]/g, '');
          })
        });
        document.querySelectorAll('input[placeholder="Наименование"]').forEach((item)=> {
          item.addEventListener('keyup',() => {
            item.value = item.value.replace (/^[A-Za-z0-9]+$/, '');
          })
        })
      }
    }
    let appData = new AppData();
    appData.eventsListener();

    //-----------------------Работа с куки----------------------------------------------------------------------//
