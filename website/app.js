/* Global Variables */
const backendURL = "http://localhost:8000";
const weatherKey = "0bdae6985d07a46821ad131da0c78aca";
const weatherURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + weatherKey;

// Create a new date instance dynamically with JS
function getRecentDate() {
    let d = new Date();
    let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

// Get user response
function getUserResponse() {
    const response = document.getElementById('feelings').value;
    return response;
}

// Update UI
const updateUI = async () => {
    const response = await fetch('/retrieveData');
    try {
        const allData = await response.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }catch(error) {
        console.log("error", error);
    }
};

// function to make GET request to OpenWeatherMap API
const getWeather = async (baseURL = '', zipcode = '') => {
    const res = await fetch(baseURL + '&units=metric&zip=' + zipcode);
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
    if (zip.validity.patternMismatch || zip.value===''){
        alert('The zip code is incorrect for US.')
    }
    else {
        getWeather(weatherURL, zip.value)
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
            updateUI();
        });
    }

    
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