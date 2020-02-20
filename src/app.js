const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sourav Sadhukhan' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Author',
        name: 'Sourav Sadhukhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sourav Sadhukhan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an Location'
        })
    }
    geocode(req.query.address,(error, {latitude,Longitude,location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }  
        weather(latitude,Longitude,(error,forecast) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.send('404 Not found vaag')
})

app.listen(8080, () => {
    console.log('Server is up on port 8080.')
})