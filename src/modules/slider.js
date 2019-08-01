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

export default slider;
