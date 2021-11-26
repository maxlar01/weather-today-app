/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey = ''; // Use your API Key from openweathermap.org

// Create a new date instance dynamically with JS.
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

const submitBtn = document.getElementById('submit');


// Functions.
const getWeatherData = async (baseURL, zip, key) => {
    try {
        const response = await fetch(baseURL + zip + '&units=metric' + `&appid=${key}`);
        return response.json();
    }
    catch (error) {
        console.error("Error: ", error);
    }

}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error: ', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/weatherData')
    try {
        const receivedData = await request.json();
        document.getElementById('date').innerText = receivedData.date;
        document.getElementById('temp').innerText = receivedData.temperature;
        document.getElementById('content').innerText = receivedData.content;
        document.getElementById('location').innerText = receivedData.location;
    }
    catch (error) {
        console.log("Error", error);
    }
}

// Events
submitBtn.addEventListener('click', () => {
    const zipValue = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipValue == '' || content == '') alert("Don't leave an empty field!");
    else if (!/^[a-zA-Z]*$/g.test(content)) alert("Invalid characters in second field!");
    else {
        getWeatherData(baseURL, zipValue, apiKey)
            .then(data => {

                //Storing relevant data
                const temp = data.main.temp;
                const city = data.name;

                //postData
                postData('/submitData', { date: newDate, temperature: temp, location: city, content: content });

                //updateUI
                updateUI();
            })
    }
})


