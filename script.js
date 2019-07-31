window.addEventListener('DOMContentLoaded',() => {
  const dog = document.getElementById('dog'),
        cat = document.getElementById('cat'),
        fox = document.getElementById('fox'),
        animWrapper = document.querySelector('.btn-wrap'),
        output = document.getElementById('output');

const dogAPI = 'https://random.dog/woof.json',
      catAPI = 'https://aws.random.cat/meow';





  animWrapper.addEventListener('click',(e) => {
    output.innerHTML = '';
    let target = e.target;
    if (target === dog) {
      getData(dogAPI)
      .then(res => {
        if (res.status !== 200) throw new Error('Invalid API\'s url')
        console.warn('Your data is successfully recieved');
         return res.json();
      })
       .then(data => {
        if (data.url.search('mp4') > -1) {
          const video = document.createElement('video');
                output.appendChild(video);
          video.src = data.url;

        }else{
          const img = document.createElement('img');
                output.appendChild(img);
          img.src = data.url
        }


       })
      .catch(error => console.error(error))
    }else if (target === cat) {
      getData(catAPI)
      .then(res => {
        if (res.status !== 200) throw new Error('Invalid API\'s url');
        console.warn('Your data is successfully recieved');
         return res.json();
      })
       .then(data => {
        if (data.file.search('mp4') > -1) {
          const video = document.createElement('video');
                output.appendChild(video);
          video.src = data.file;

        }else{
          const img = document.createElement('img');
                output.appendChild(img);
          img.src = data.file
        }

       })
      .catch(error => console.error(error))
    }else if (target === fox) {
      getData('server.php')
      .then(res => {
        if (res.status !== 200) throw new Error('Invalid API\'s url')
        console.warn('Your data is successfully recieved');
         return res.json();
      })
        .then(data => {
        if (data.image.search('mp4') > -1) {
          const video = document.createElement('video');
                output.appendChild(video);
          video.src = data.image;

        }else{
          const img = document.createElement('img');
                output.appendChild(img);
          img.src = data.image;
        }
       })
      .catch(error => console.error(error))

    }



  })




  const getData = (url) => {
     return fetch(url,{
      method:"GET",
      mode:'cors'
    })
  }




})
