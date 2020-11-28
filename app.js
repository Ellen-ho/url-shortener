const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    ifEquals: function (value1, value2) {
      return value1 === value2
    }
  }
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
