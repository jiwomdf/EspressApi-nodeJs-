const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// connect to mongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(3000))
    .catch(err => console.log(err))

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//blog routes
app.use('/blogs/', blogRoutes)

//register view engine
app.set('view engine', 'ejs') // --> default looking in `views` directory

app.get('/', (req, res) => {
    res.redirect('/blogs')
})


/* 404 page must be in the bottom */
// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
