const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?&access_token=pk.eyJ1IjoiZnJhbmsyMjgyIiwiYSI6ImNrNm5iYWJrMDB2d2MzcnA2Njk0c2cyaHAifQ.3aXmpMYPwaXbEj68zIcHBA'

    request({url: url, json:true}, (error,response) => {
    if(error) {
        callback('Unable to connect to location service!',undefined)
    } else if(response.body.features.length === 0) {
            callback('Address Not Found!',undefined)
    } else {
        callback(undefined,
            {
            latitude: response.body.features[0].center[1],
            Longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        }) 
    }
})
}


module.exports = geocode