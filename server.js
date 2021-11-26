// Setup empty JS object to act as endpoint for all routes.
projectData = {};

//Including required libraries.
const express  = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Initialize port number.
const port = 3000;

// Start up an instance of app.
const app = express();

/* Middleware*/
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));

// Setup Server.
const server = app.listen(port, () => console.log(`Server is runnig on localhost: ${port}`));

//Setup routes

//GET ROUTE.
app.get('/weatherData', sendData);
function sendData (request, response) {
    response.send(projectData);
}

//POST ROUTE.
app.post('/submitData', submitData);
function submitData (request, response) {
    const newEntry = {
        date: request.body.date,
        temperature: request.body.temperature,
        location: request.body.location,
        content: request.body.content
    }

    projectData = newEntry;
    console.log(projectData);
}