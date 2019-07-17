'use strict';

let button = document.querySelector('.button'),
    block = document.querySelector('.myblock'),
    anim = false,
    count = 0,
    flyInterval;

let flyfunc = function(){
    flyInterval = requestAnimationFrame(flyfunc);
      count++;
      if (count < 1000){
        block.style.left = count + 'px';
      }else{
        cancelAnimationFrame(flyInterval);
      }
    }


button.addEventListener('click',function(){
  if (!anim) {
    flyInterval = requestAnimationFrame(flyfunc);
    anim = true;
  }else{
    anim = false;
    cancelAnimationFrame(flyInterval);
  }
})

document.querySelector('.reset').addEventListener('click',function(){
  block.style.left = 0;
  count = 0;
  cancelAnimationFrame(flyInterval);
  anim = false;
})
