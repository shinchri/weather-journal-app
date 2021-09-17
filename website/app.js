/* Global Variables */
const backendURL = "http://localhost:8000";
const weatherKey = "0bdae6985d07a46821ad131da0c78aca";
const weatherURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + weatherKey;

// Create a new date instance dynamically with JS
function getRecentDate() {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

// Get user response
function getUserResponse() {
    const response = document.getElementById('feelings').value;
    return response;
}

// Update UI
function updateUI ( date, temperature, content) {
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temperature;
    document.getElementById('content').innerHTML = content;
}

// function to make GET request to OpenWeatherMap API
const getWeather = async (baseURL = '', zipcode = '') => {
    const res = await fetch(baseURL + '&zip=' + zipcode);
    try {
        const data = await res.json();
        // console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

// Event listener for element with id 'generate' using callback function
document.getElementById('generate').addEventListener('click', performAction);

// Create Callback function 
function performAction() {
    const zip = document.getElementById('zip').value;

    getWeather(weatherURL, zip)
    .then(function(weatherData) {
        console.log(weatherData);
        const data = {
            'temperature': weatherData.main.temp,
            'date': getRecentDate(),
            'user_response': getUserResponse()
        }
        postData('/postData', data);
        return data;
    })
    .then(function(data) {
        updateUI(data.date, data.temperature, data.user_response);
    });
}

// Post data that was retrieved from client side
const postData = async(baseURL='', data) => {
    const response = await fetch(backendURL + baseURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        console.log(response);
        const newData = await response.json();
        console.log(newData);

    }catch(error) {
        console.log("error", error);
    }
};