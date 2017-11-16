var domain = window.location.href;
    submitBtn = document.getElementsByTagName('paper-button')[0];

submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  var request,
      form,
      userData;

  function makeRequest() {
    request = new XMLHttpRequest();
    form = document.querySelector('form');
    userData = new FormData(form);

    request.onreadystatechange = handleResponse;
    request.open('POST', domain + 'contactme');
    request.send(userData);
  }

  function handleResponse() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        console.log(request);
      } else {
        console.log('oh boy');
      }
    }
  }

  makeRequest();
});
