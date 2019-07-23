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

      popup.addEventListener('click',(e) => {
        let target = e.target;
        if (target.classList.contains('popup-close')) {
          popup.style.display = 'none';
          togglePopup();
        }else{
          target = target.closest('.popup-content');
          if (!target) {
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
      const wrapper = document.querySelector('#workers');
      let prevSrc;

      wrapper.addEventListener('mousemove',(e) => {
        if (e.target.classList.contains('command__photo')){
          prevSrc = e.target.src;
          e.target.src = e.target.dataset.img;
        }else{
          e.target.src = prevSrc;
        }
      });

    }
    photoChange();

    const calcValidate = () => {
      const calcInp = document.querySelectorAll('.calc-block>input');
         calcInp.forEach((item,index) => {
           calcInp[index].addEventListener('input',()=>{
             calcInp[index].value = calcInp[index].value.replace(/[a-z]+/gi,'');
           })
         })
    }
    calcValidate();

});
