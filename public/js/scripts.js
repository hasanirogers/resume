function validateForm() {
  let fields = document.querySelectorAll('[required]');

  // convert the fields nodeList to an array and iterate over each
  Array.from(fields).forEach((element, index) => {
    element.addEventListener('blur', function() {
      //console.log(this.value);
      isValid = validateElement(element);
    });
  });
}

function validateElement(elm) {
  if(typeof elm.value != 'undefined') {
    if (elm.value.length > 2) {
      return true;
    }
  } else {
    console.log(elm);
    elm.classList.add('wuuuut');
    return false;
  }
}

function handleContact() {
  event.preventDefault();

  let request,
    formData = new String;
  form = document.querySelector('form'),
    submitBtn = document.querySelector('paper-button'),
    submitBtnMsg = form.querySelector('span');
  submitBtnMsgText = submitBtnMsg.innerText;

  submitBtn.setAttribute('disabled', true);

  function makeRequest() {
    request = new XMLHttpRequest();

    // add loading status for form
    form.classList.add('loading');

    // build form string
    formData = 'user=' + document.getElementById('user').value;
    formData += '&phone=' + document.getElementById('phone').value;
    formData += '&email=' + document.getElementById('email').value;
    formData += '&message=' + document.getElementById('message').value;

    // TODO research ways to use the FormData API with node
    // # https://developer.mozilla.org/en-US/docs/Web/API/FormData
    // # https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
    // # https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files
    // testData = new FormData(form);
    // testData.append('user', document.getElementById('user').value)

    // handle request
    request.onreadystatechange = handleResponse;
    request.open('POST', domain + form.getAttribute('action'), true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(formData);
  }

  function handleResponse() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        formContactSuccess();
      } else {
        formContactError();
      }
    }
  }

  function formContactSuccess() {
    form.classList.remove('contact--loading');
    form.classList.add('contact--success');
    submitBtnMsg.innerHTML = "Sweet. I got your message. I'll follow up soon."
    // change button to green then fade it out
  }

  function formContactError(formElm) {
    form.classList.remove('contact--loading');
    form.classList.add('contact--error');
    submitBtnMsg.innerHTML = "Oh boy. Something happen and I didn't your message.";

    setTimeout(function () {
      form.classList.remove('contact--error');
      submitBtn.removeAttribute('disabled');
      submitBtnMsg.innerHTML = submitBtnMsgText;
    }, 3000);
  }

  if (isValid) makeRequest();
}


window.onload = function() {
  let domain = window.location.href,
    isValid = false,
    submitBtn = document.getElementsByTagName('paper-button')[0];

  validateForm();
  submitBtn.addEventListener('click', handleContact);
}
