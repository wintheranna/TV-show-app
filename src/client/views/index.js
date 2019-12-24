document.getElementById('save').addEventListener('click', performAction);
document.getElementById('delete').addEventListener('click', performDelete);

// Function called by event listener
function performAction(event) {
  // user input
  let newlocation = document.getElementById('location').value;
  

  // API for tvmaze API
  const baseUrl = 'http://api.tvmaze.com/singlesearch/shows?q=';
  const episode = '&embed=episodes'; 
  
  // GET and POST data, update user interface
  getData(baseUrl, newlocation, episode)
  .then( (data) => {
    var location = [];
    var photo = [];
    for (let i = 0; i < data._embedded.episodes.length; i++) {
      var loc = 'episode name: <a target="_blank" href="index2.html?'+data._embedded.episodes[i].summary+'">' + data._embedded.episodes[i].name +'</a><br>';
      var num = 'episode number: ' + data._embedded.episodes[i].number + '<br>';
      var seas = 'season: ' + data._embedded.episodes[i].season;
      if (data._embedded.episodes[i].image === null) {
          var im = '<br><br>no picture found'; 
      } else {
          var im = '<br><br><img src=' + data._embedded.episodes[i].image.medium + '>';
      };
      console.log(loc);
      location.push(loc+num+seas);
      photo.push(im);
    }
    console.log(location);
    postData('http://localhost:8080/save', {
        location,
        photo,
      
    });
    }).then( () => {
      updateUI('http://localhost:8080/all');
      });
}



// Function to GET tvmaze API Data
const getData = async (baseUrl, newlocation, episode) => {
  const response = await fetch(baseUrl+newlocation+episode);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch(error) {
      console.log('error', error);
    }
}

// Function to POST data
const postData = async (url='', data={}) => {
  console.log(data);
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  try {
    console.log(response);
  } catch(error) {
      console.log('error', error);
    }
}


// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch('http://localhost:8080/all');
  try {
    const allData = await request.json();
    console.log(allData);
    for (let i = 0; i < allData.location.length; i++) {
      document.getElementById('ourLocation').innerHTML += '<p>' + allData.location[i] + '</p>';
      document.getElementById('photo').innerHTML += allData.photo[i];
     
    }
  } catch(error) {
      console.log('error', error);
    }
}


// Function called by event listener, delete data
function performDelete(event) {
    document.getElementById('ourLocation').innerHTML = '';
    document.getElementById('photo').innerHTML = '';
  }


 