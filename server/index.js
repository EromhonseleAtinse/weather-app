const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
let db = require('./database')
const ENV = process.env.NODE_DEV;
const PORT = process.env.PORT || 5000;




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use('/api/cities', require('./api/cities'))
app.use('/api/weather', require('./api/weather'))



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

db.query('SELECT NOW()', (err, res) => {

  if (err.error) {
    return console.log(err.error);
  } else {
    console.log(`PostgreSQL connected: ${res[0].now}.`)
  }
})

module.exports = app;
