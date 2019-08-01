const validate = () => {
  const phones = document.querySelectorAll('input[name="user_phone"]'),
        messages = document.querySelectorAll('input[name="user_name"],input[name="user_message"]');

  phones.forEach(item => {
    item.addEventListener('input',() => {
      item.value = item.value.replace(/[a-zа-я]/gi,'')
      if (item.value.length === 12) {
        if (!(/([+]?[0-9\s-\(\)]{3,25})*$/i.test(item.value))) {
          item.value = '';
        }
      }else if (item.value.length > 12) {
        item.value = '';
      }
    })
  })
  messages.forEach(item => {
    item.addEventListener('input',() => {
      item.value = item.value.replace(/[a-z0-9]/gi,"")
    })
  })

}
export default validate;
