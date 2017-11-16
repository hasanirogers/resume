document.getElementById('contact').addEventListener('submit', function(event) {
  event.preventDefault();

  var request;

  function makeRequest() {
    request = new XMLHttpRequest();
    request.onreadystatechange = handleResponse;
    request.open('GET', '/email');
    request.send();
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
