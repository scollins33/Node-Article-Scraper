const express = require('express');
const expHandls = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// port and app declaration
const PORT = process.env.PORT || 3000;
const app = express();

// give app access to static public files
app.use(express.static('public'));

// body-parser and handlebars middleware
app.use(bodyParser.json());
app.engine('handlebars', expHandls({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Create Mongoose connection
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/redditScrapes", {
    useMongoClient: true
});

// get the routes
const routes = require('./controllers/routes');
app.use('/', routes);

// start the server listening
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});