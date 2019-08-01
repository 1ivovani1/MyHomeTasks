const photoChange = () => {
  const wrapper = document.querySelector('#workers'),
        srcS = document.querySelectorAll('.command__photo');

  let prevSrc,prevTarget;


  wrapper.addEventListener('mouseover',(e) => {
    prevTarget = e.target;
    prevSrc = prevTarget.src;

    if (prevTarget.classList.contains('command__photo')){
      prevTarget.src = prevTarget.dataset.img;
      prevTarget.dataset.img = prevSrc;
    }else{
      prevSrc = prevTarget.dataset.img;
      prevTarget.dataset.img = prevSrc;
    }
  });

}
export default photoChange;
