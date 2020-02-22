const request = require('request')
const fahrenheitToCelsius = require('fahrenheit-to-celsius')


const weather = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/080999bf27b710f7b710ddced1a17903/'+lat+","+long
    request({ url: url, json: true }, (error,response) => {
        (error) ? (
            callback('Unable to connect to weather service!',undefined)
         ) : (response.body.code === 400) ? (
             callback('Invalid Location',undefined)
         ) : (
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + fahrenheitToCelsius(response.body.currently.temperature).toFixed(2) + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
         )
         })
}

module.exports = weather
