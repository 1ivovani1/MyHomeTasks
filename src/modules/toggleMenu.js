const menu = () => {
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
          mainBlock = document.querySelector('main'),
          menuItems = menu.querySelectorAll('ul>li'),
          nextPage = document.querySelector('.next-part');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    }

    window.addEventListener('click',(e) => {
      let target = e.target;
        if(target.classList.contains('close-btn')){
          handlerMenu();
        }else if (target.matches("main *:not(.menuImg):not(.menuSmall)")) {
            menu.classList.remove('active-menu');
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
}

export default menu;
