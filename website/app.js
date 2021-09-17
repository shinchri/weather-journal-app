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

