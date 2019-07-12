'use strict';

function DomElement(selector,height,width,bg,fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

let newElem,
    topM = 0,
    leftM = 0;
    
DomElement.prototype.createElem = function() {
     if (this.selector[0] === '.') {
      newElem = document.createElement('div');
      newElem.classList.add(this.selector.substr(1));
      document.querySelector('body').appendChild(newElem);
     }else if (this.selector[0] === '#') {
       newElem = document.createElement('p');
       document.querySelector('body').appendChild(newElem)
     }
    newElem.textContent = 'Тут какой-то текст';
    newElem.style.height = this.height + 'px';
    newElem.style.width = this.width + 'px';
    newElem.style.background = this.bg;
    newElem.style.fontSize = this.fontSize + 'px';
};

let firstElem = new DomElement('.myBlock',100,100,'red',20);
 document.addEventListener('DOMContentLoaded',function(){
  firstElem.createElem();
  newElem.style.position = 'absolute';
  window.addEventListener('keydown',function(e){
    if (e.keyCode === 40) {
      topM += 10;
      newElem.style.top = topM + 'px';
    }
    if (e.keyCode === 39) {
      leftM += 10;
      newElem.style.left = leftM + 'px';
    }
    if (e.keyCode === 37) {
      leftM -= 10;
      newElem.style.left = leftM + 'px';
    }
    if (e.keyCode === 38) {
      topM -= 10;
      newElem.style.top = topM + 'px';
    }
  })
 });
