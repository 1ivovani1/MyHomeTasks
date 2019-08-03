const photoChange = () => {
  const wrapper = document.querySelector('#workers'),
        srcS = document.querySelectorAll('.command__photo');

  srcS.forEach((item) => {
      let ourPhotos;

      item.addEventListener('mouseover',(event) => {
        ourPhotos = event.target.src;
        event.target.src = event.target.dataset.img;
      });

      item.addEventListener('mouseout',(event) => {
        event.target.src = ourPhotos;
      });
  });

};
export default photoChange;
