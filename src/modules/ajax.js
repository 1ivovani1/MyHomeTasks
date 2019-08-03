const sendForm = () => {
  const errorMessage = 'Упс... Что-то пошло не так!',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.querySelectorAll('form');

  const statusMessage = document.createElement('div');
        statusMessage.classList.add('success-message');
        statusMessage.style.cssText = "font-size:2rem;color:white;";

  form.forEach(item => {
    const inputs = item.querySelectorAll('input');
    item.addEventListener('submit',(e) => {
      e.preventDefault();
      item.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const data = new FormData(item);
      let body = {};
      data.forEach((val,key) => {
        body[key] = val;
      })

      postData(body)
      .then((response)=>{
        console.log(response);
        if (response.status !== 200) {
          throw new Error("I can't connect to the server...")
        }
        statusMessage.textContent = successMessage;
        inputs.forEach(item => item.value = '');
      })
      .catch(error => {
        console.error(error);
        inputs.forEach(item => item.value = '');
        statusMessage.textContent = errorMessage;
      })
     })
  })

  const postData = (body) => {
    return fetch('./server.php',{
      method:'POST',
      headers:{
        'Content-Type':'application/JSON'
      },
      body:JSON.stringify(body)
    });
  };

};
export default sendForm;
