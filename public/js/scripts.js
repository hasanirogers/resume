var domain = window.location.href;
    submitBtn = document.getElementsByTagName('paper-button')[0];

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let request,
      form,
      userData;

  function makeRequest() {
    request = new XMLHttpRequest();
    form = document.querySelector('form');
    formData = new FormData(form);

    // set data
    formData.append('user', document.getElementById('user').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);

    // handle request
    request.onreadystatechange = handleResponse;
    request.open('POST', domain + form.getAttribute('action'), true);
    // auto serialize by content-type: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Submitting_forms_and_uploading_files
    // note that node request plain text
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


    // send data
    // debug: display values
    for (let value of formData.values()) {
      console.log(value);
    }
    request.send(formData);
  }

  function handleResponse() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        //console.log(request);
      } else {
        console.log('oh boy');
      }
    }
  }

  makeRequest();
});
