var XHR = {};

XHR.get = function(url, data) {
  var queryString = '';
  if (data) {
    var keys = Object.keys(data);

    var queryString = '?' + keys.map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
  }

  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function() {
      resolve(JSON.parse(xhr.responseText));
    });

    xhr.addEventListener('error', function() {
      reject(xhr.statusText);
    });

    xhr.open('GET', url + queryString, true);
    xhr.send();
  });

  return promise;
};