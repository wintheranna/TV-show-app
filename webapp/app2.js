
var queryString = location.search.substring(1);
var newstring = decodeURI(queryString);

const updateUI = () => {
        document.getElementById("summary").innerHTML = newstring;
  }

  window.addEventListener('DOMContentLoaded', updateUI);

