document.getElementById('save').addEventListener('click', performAction);
document.getElementById('delete').addEventListener('click', performDelete);

// Function called by event listener
function performAction(event) {
  // user input
  let input = document.getElementById('titleOne').value;
  // API tvmaze
  const baseUrl = 'http://api.tvmaze.com/singlesearch/shows?q=';
  const episode = '&embed=episodes'; 
  // GET and POST data, update user interface
  getData(baseUrl, input, episode)
  .then( (data) => {
    const showData = [];
    for (let i = 0; i < data._embedded.episodes.length; i++) {
      const season = 'Season: ' + data._embedded.episodes[i].season + ', ';
      const number = 'Episode: ' + data._embedded.episodes[i].number + '<br>';
      const title = 'Title: <a target="_blank" href="index2.html?'+data._embedded.episodes[i].summary+'">' + data._embedded.episodes[i].name +'</a>';
      if (data._embedded.episodes[i].image === null) {
          var image = '<br><br>No picture found'; 
      } else {
          image = '<br><br><img src=' + data._embedded.episodes[i].image.medium + '>';
        };
      showData.push(season+number+title+image);
    }
    postData('http://localhost:8080/save', {
        showData,  
    });
    }).then( () => {
      updateUI('http://localhost:8080/all');
      });
}


// Function to GET tvmaze API Data
const getData = async (baseUrl, input, episode) => {
  const response = await fetch(baseUrl+input+episode);
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
    for (let i = 0; i < allData.tvData.length; i++) {
      document.getElementById('ourEpisodes').innerHTML += '<div class="layout">' + allData.tvData[i] + '</div>';
    }
  } catch(error) {
      console.log('error', error);
    }
}


// Function called by event listener, delete data
function performDelete(event) {
    document.getElementById('ourEpisodes').innerHTML = '';
  }


 