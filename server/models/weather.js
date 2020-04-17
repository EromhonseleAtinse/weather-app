const API_KEY = '03aceafef80daa4cdb44b702158ba2c2'
const fetch = require('node-fetch');

class Weather {
    static retrieveByCity(city, callback) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`).
            then((res) => res.json()).then((res) => callback(res))
            .catch((err) => {
                console.log(err)
                callback({ error: 'Could not reach the API' })
            })
    }
}

module.exports = Weather