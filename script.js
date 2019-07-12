'use strict';

function DomElement(selector,height,width,bg,fontSize){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createElem = function() {
    let newElem;
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
firstElem.createElem();

let secondElem = new DomElement('#myBlock',100,100,'blue',20);
secondElem.createElem();
