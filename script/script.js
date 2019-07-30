window.addEventListener('DOMContentLoaded',function() {
    'use strict';

    //Таймер
    const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    let dateNow = new Date(),
        nextDay = `${dateNow.getUTCDate() + 1} ${months[dateNow.getUTCMonth()]} ${dateNow.getUTCFullYear()}`;
    const countTimer = (deadline) => {
       let dateNow1 = new Date(),
           nextDay1 = `${dateNow1.getUTCDate() + 2} ${months[dateNow1.getUTCMonth()]} ${dateNow1.getUTCFullYear()}`;
      let timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

      function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNoww = new Date().getTime(),
            timeRemaining = (dateStop - dateNoww) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            hours.toString().length === 1 ? hours = "0" + hours.toString() : hours = hours;
            minutes.toString().length === 1 ? minutes = "0" + minutes.toString() : minutes = minutes;
            seconds.toString().length === 1 ? seconds = "0" + seconds.toString() : seconds = seconds;

            return {timeRemaining, hours, minutes, seconds};
      }

        let timer = getTimeRemaining();
        if (timer.timeRemaining < 0) {
            clearInterval(timerInterval);
            timerInterval = setInterval(countTimer,1000,nextDay1);
        }
        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

    }
    let timerInterval = setInterval(countTimer,1000,nextDay);

    //Функция прокрутки до определенного элемента
    const slowScroll = (id) => {
        const item = document.querySelector(id),
              topMarg = item.getBoundingClientRect().top;


        let scrollAnim = setInterval(() => {
              if (topMarg > document.documentElement.scrollTop) {
                if (topMarg >= 1500) {
                  document.documentElement.scrollTop += 8;
                }else{
                  document.documentElement.scrollTop += 4;
                }
              }else{
                clearInterval(scrollAnim);
              }
        },1)
    }

    //Меню
    const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li'),
            nextPage = document.querySelector('.next-part');

      const handlerMenu = () => {
        menu.classList.toggle('active-menu')
      }


      menu.addEventListener('click',(e) => {
        let target = e.target;
          if(target.classList.contains('close-btn')){
            handlerMenu();
          }else{
            target = target.closest('menu');
            if (target) {
              menu.classList.remove('active-menu');
            }
          }

      })

      btnMenu.addEventListener('click',handlerMenu);

      menuItems.forEach((item,index) => item.addEventListener('click',(e) => {
          e.preventDefault();
          handlerMenu();
          switch (index) {
            case 0:
              slowScroll("#service-block");
              break;
            case 1:
              slowScroll('#portfolio');
              break;
            case 2:
              slowScroll('#calc');
              break;
            case 3:
              slowScroll('#command');
              break;
            case 4:
              slowScroll('#connect');
              break;
            default:
              break;
          }

      }));
      nextPage.addEventListener('click',(e) => {
        e.preventDefault();
        slowScroll('#service-block');
      })
    }
    toggleMenu();

    // Поп-ап окно
    const togglePopup = () => {
      const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

      let count = 0,
          animInterval;

      const checkMess = () => {
        const sucessMess = document.querySelector('.success-message');
        if (sucessMess) {
          sucessMess.parentNode.removeChild(sucessMess);
        }
      }

      popup.addEventListener('click',(e) => {
        let target = e.target;
        if (target.classList.contains('popup-close')) {
          checkMess();
          popup.style.display = 'none';
          togglePopup();
        }else{
          target = target.closest('.popup-content');
          if (!target) {
              checkMess();
              popup.style.display = 'none';
              togglePopup();
          }
        }

      });

      popupBtn.forEach((item) => {
          item.addEventListener('click', () => {
            if (window.innerWidth > 1350) {
              popupContent.style = `position:absolute;top:0`
              popup.style.display = `block`;
              animInterval = requestAnimationFrame(popupAnim);
            }else{
              popup.style.display = `block`;
            }
        })
      });

      const popupAnim = () => {
        let height = popupContent.getBoundingClientRect().height;
        animInterval = requestAnimationFrame(popupAnim);
        count += 1.5;
        if ((window.innerHeight / 2 - height / 2) > count) {
          popupContent.style.top = `${count}px`;
        }else{
          cancelAnimationFrame(popupAnim);
        }
      }

    }
    togglePopup();

    //табы
    const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index) => {
          for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
              tabContent[i].classList.remove('d-none');
              tab[i].classList.add('active');
            }else{
              tabContent[i].classList.add('d-none');
              tab[i].classList.remove('active');
            }
          }
      };

      tabHeader.addEventListener('click', (e) => {
        let target = e.target;
            target = target.closest('.service-header-tab');

        if (target) {
          tab.forEach((item,i) => {
              if (item === target) {
                toggleTabContent(i);
              }
            })
          }

      });
    };
    tabs();

    //слайдер
    const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item'),
            btns = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotsWrapper = document.querySelector('.portfolio-dots');

      let currentSlide = 0,
          interval;

      const createDot = () => {
        slide.forEach(() => {
          let newDot = document.createElement('li');
          newDot.classList.add('dot');
          dotsWrapper.appendChild(newDot);
        })
        const allDots = document.querySelectorAll('.dot');
        allDots[0].classList.add('dot-active')
      }
      createDot();

      const dots = document.querySelectorAll('.dot');

      const prevSlide = (elem,index,strClass) => {
        elem[index].classList.remove(strClass);
      }

      const nextSlide = (elem,index,strClass) => {
        elem[index].classList.add(strClass);
      }

      const autoPlaySlide = () => {
        prevSlide(slide,currentSlide,'portfolio-item-active');
        prevSlide(dots,currentSlide,'dot-active');
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide,currentSlide,'portfolio-item-active');
        nextSlide(dots,currentSlide,'dot-active');
      }

      const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide,time);
      }

      const stopSlide = () => {
        clearInterval(interval);
      }

      slider.addEventListener('click',(e) => {
        e.preventDefault();
        let target = e.target;

        if (!target.matches('#arrow-right, #arrow-left, .dot')) {
          return;
        }

        prevSlide(slide,currentSlide,'portfolio-item-active');
        prevSlide(dots,currentSlide,'dot-active');

        if (target.matches('#arrow-right')) {
          currentSlide++;
        }else if (target.matches('#arrow-left')) {
          currentSlide--;
        }else if (target.matches('.dot')){
          dots.forEach((item,index) => {
            if (item === target) {
              currentSlide = index;
            }
          })
        }
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        if (currentSlide < 0 ) {
          currentSlide = slide.length - 1;
        }

        nextSlide(slide,currentSlide,'portfolio-item-active');
        nextSlide(dots,currentSlide,'dot-active');
      })

      slider.addEventListener('mouseover',(e) => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
          stopSlide();
        }
      })

      slider.addEventListener('mouseout',(e) => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
          startSlide();
        }
      })

      startSlide(3000);
    }
    slider();

    //работа с командой

    const photoChange = () => {
      const wrapper = document.querySelector('#workers'),
            srcS = document.querySelectorAll('.command__photo');

      let prevSrc,prevTarget;


      wrapper.addEventListener('mouseover',(e) => {
        prevTarget = e.target;
        prevSrc = prevTarget.src;

        if (prevTarget.classList.contains('command__photo')){
          prevTarget.src = prevTarget.dataset.img;
          prevTarget.dataset.img = prevSrc;
        }else{
          prevSrc = prevTarget.dataset.img;
          prevTarget.dataset.img = prevSrc;
        }
      });

    }
    photoChange();
//калькулятор
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

    //send-ajax-form

    const sendForm = () => {
      const errorMessage = 'Упс... Что-то пошло не так!',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

      const form = document.querySelectorAll('form');

      const statusMessage = document.createElement('div');
            statusMessage.classList.add('success-message')
            statusMessage.style.cssText = "font-size:2rem;color:white;"

      form.forEach(item => {
        const inputs = item.querySelectorAll('input');
        item.addEventListener('submit',(e) => {
          e.preventDefault();
          item.appendChild(statusMessage);
          statusMessage.textContent = loadMessage;
          const formData = new FormData(item);
          let body = {};

          for (let val of formData.entries()) {
              body[val[0]] = val[1];
          }

          postData(body)
          .then(()=>{
            console.log(successMessage,body);
            statusMessage.textContent = successMessage;
            inputs.forEach(item => item.value = '');
          })
          .catch(error => {
            console.error(error);
            statusMessage.textContent = errorMessage;
          })
        })
      })

      const postData = (body) => {
        return new Promise((resolve,reject) => {
          const request = new XMLHttpRequest();
          request.addEventListener('readystatechange',() => {

            if (request.readyState !== 4) {
              return
            }
            if(request.status === 200){
              resolve();
            }else{
              reject();
            }
          })
          request.open('POST','./server.php');
          request.setRequestHeader('Content-Type','application/JSON');
          request.send(JSON.stringify(body));

        })
      }

    }
    sendForm();

    //inputs validate

    const validate = () => {
      const phones = document.querySelectorAll('input[name="user_phone"]'),
            messages = document.querySelectorAll('input[name="user_name"],input[name="user_message"]');

      phones.forEach(item => {
        item.addEventListener('input',() => {
          item.value = item.value.replace(/[a-zа-я]/gi,'')
          if (item.value.length === 12) {
            if (!(/([+]?[0-9\s-\(\)]{3,25})*$/i.test(item.value))) {
              item.value = '';
            }
          }else if (item.value.length > 12) {
            item.value = '';
          }
        })
      })
      messages.forEach(item => {
        item.addEventListener('input',() => {
          item.value = item.value.replace(/[a-z0-9]/gi,"")
        })
      })

    }
    validate();
});
