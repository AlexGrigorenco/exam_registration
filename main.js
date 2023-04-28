


const form = document.querySelector('#registration-form')

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePhone(phone) {
    let re = /^[0-9\s]*$/;
    return re.test(String(phone));
}
function setErrorMessage(element, className, errorMessage, parent){
    if(!parent.querySelector('span')){
        const error = document.createElement(element)

        error.classList.add(className)
        error.innerText = errorMessage
        parent.appendChild(error)
    }
        parent.classList.add('error')
}
function removeErrorMessage(parent){
    parent.querySelector('span') ? parent.querySelector('span').remove() : null
    parent.classList.remove('error')
}

function setErrorAlert(element, className, errorMessage, parent){
    if(!parent.querySelector(`.${className}`)){
        const error = document.createElement(element)

        error.classList.add(className)
        error.innerText = errorMessage
        parent.appendChild(error)
    }
}
function removeErrorAlert(parent, className){
    parent.querySelector(className) && parent.querySelector(className).remove()
}

function successSubmit(form){
    const message = document.createElement('p')
    message.classList.add('success-submit')
    message.innerText = 'Спасибо! Ваша заявка отправлена успешно. С Вами свяжутся наши специалисты.'

    form.querySelectorAll('.input-wrapper').forEach(inputWrapper => inputWrapper.style.display = 'none')
    form.querySelector('button').parentElement.style.display = 'none'
    !form.querySelector('.success-submit') && form.prepend(message)
    
}

form.onsubmit = (event) => {
    event.preventDefault()

    const inputs = event.target.querySelectorAll('input')
    const inputPhone = event.target.querySelector('[data-phone]')
    const inputEmail = event.target.querySelector('[data-email]')
    const select = event.target.querySelector('select')
    const errorAlerts = event.target.querySelector('.error-alerts')
    const emptyInputs = Array.from(inputs).filter(input => input.value.trim() === '')

    inputs.forEach(input => {
        if(input.value.trim() === ''){
            !input.parentElement.querySelector('span') ? createError('span', 'error-message', 'Пожалуйста, заполните все обязательные поля', input.parentElement) : input.parentElement.querySelector('span').innerText = 'Пожалуйста, заполните все обязательные поля'
            input.parentElement.classList.add('error')
        }else{
            removeErrorMessage(input.parentElement)
        } 
    })

    if(!validateEmail(inputEmail.value)){
        setErrorMessage('span', 'error-message', 'Укажите, пожалуйста, корректный email', inputEmail.parentElement)

        inputEmail.value.trim() !== '' && setErrorAlert('p', 'email-not-valid', 'Укажите, пожалуйста, корректный email', errorAlerts)
    }else{
        removeErrorMessage(inputEmail.parentElement)
        removeErrorAlert(errorAlerts, '.email-not-valid')
    }

    if(!validatePhone(inputPhone.value) || inputPhone.value.trim() === ''){
        setErrorMessage('span', 'error-message', 'Укажите, пожалуйста, корректный номер телефона', inputPhone.parentElement)

        inputPhone.value.trim() !== '' && setErrorAlert('p', 'phone-not-valid', 'Укажите, пожалуйста, корректный номер телефона', errorAlerts)
    }else{
        removeErrorMessage(inputPhone.parentElement)
        removeErrorAlert(errorAlerts, '.phone-not-valid')
    }

    if(select.value === 'none'){
        setErrorMessage('span', 'error-message', 'Пожалуйста, заполните все обязательные поля', select.parentElement)
    }else{
        removeErrorMessage(select.parentElement)      
    }     

    if(emptyInputs.length !== 0 || select.value === 'none' || !validateEmail(inputEmail.value) || !validatePhone(inputPhone.value)){
        setErrorAlert('p', 'error-message', 'Пожалуйста, заполните все обязательные поля', errorAlerts)
        return false
    }else{
        removeErrorAlert(errorAlerts, '.error-message')
        successSubmit(event.target)
        return true
    }
}