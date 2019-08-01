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
export default togglePopup; 
