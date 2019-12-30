// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('../client/views'));

const port = 8080;

// Callback to debug
const server = app.listen(port, listening);

function listening() {
  console.log(`server running on localhost: ${port}`);
}


// Initialize all route with a callback function
app.get('/all', callBack);

// Callback function to complete GET '/all'
function callBack(req, res){
  res.send(projectData);
};

// Post Route
app.post('/save', function (req, res) {
    projectData.tvData = req.body.showData;
    console.log('Post recieved');
    res.end();
});

