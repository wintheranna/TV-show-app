const projectData = {};
const express = require('express');
const app = express();

/* Dependencies */
/* Middleware*/

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('webapp'));

const port = 8080;

// Callback to debug
const server = app.listen(port, listening);

function listening() {
  console.log(`server running on localhost: ${port}`);
}

app.get('/all', callBack);

function callBack(req, res){
  res.send(projectData);
};

// Post Route
app.post('/save', function (req, res) {
    projectData.tvData = req.body.showData;
    console.log('Post recieved');
    res.end();
});

