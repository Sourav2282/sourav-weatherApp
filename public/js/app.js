const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherform.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'loading...'

    fetch('weather?address='+ search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})