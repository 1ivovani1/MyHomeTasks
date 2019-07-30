document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');


    const result = () => {
      dataWork()
      .then((request) => {
        const data = JSON.parse(request.responseText);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML =  `Тачка ${brand} ${model} <br>Цена: ${price}$`;
                console.warn('Данные успешно получены');
            }
        });
      })
      .catch(() => {
        console.error("ERROR!!?!??!");
        output.innerHTML = 'Произошла ошибка';
      })

    }

    const dataWork = () => {
      return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                resolve(request);
            }else if (request.readyState === 4 && request.status !== 200) {
                reject();
            }
        });


      });
    }
select.addEventListener('change',result);
});
