var domain = window.location.href;
    submitBtn = document.getElementsByTagName('paper-button')[0];

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let request,
      form,
      formData,
      testData;

  function makeRequest() {
    request = new XMLHttpRequest();
    form = document.querySelector('form');

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
        // alert('yea');
      } else {
        console.log('oh boy');
      }
    }
  }

  makeRequest();
});
