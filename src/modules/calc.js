
const myCalc = () => {
    const calcValidate = () => {
      const calcInp = document.querySelectorAll('.calc-block>input');
         calcInp.forEach((item,index) => {
           calcInp[index].addEventListener('input',()=>{
             calcInp[index].value = calcInp[index].value.replace(/[a-z]+/gi,'');
           })
         })
    }
    calcValidate();

    const calc = (price = 100) => {
      const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcCount = document.querySelector('.calc-count'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            total = document.getElementById('total');

      const countSum = () => {
        let totalSum = 0,
            countValue = 1,
            dayValue = 1,
            i = 0;
        const typeValue = calcType.options[calcType.selectedIndex].value,
              squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
          countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
          dayValue *= 2
        }else if(calcDay.value && calcDay.value < 10){
          dayValue *= 1.5
        }

        if (typeValue && squareValue) {
          totalSum = price * typeValue * squareValue * countValue * dayValue;
        }

        let interval = setInterval(() => {
          if (i < totalSum) {
            i++;
            total.textContent = i;
          }else{
            clearInterval(interval)
          }
        },10)
      }

        calcBlock.addEventListener('change',(e) => {
            const target = e.target;
            if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {
              countSum();
            }

        })

    };
    calc(100);
  }
export default myCalc;
