const minimist = require('minimist');
args = minimist(process.argv);

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/public/', express.static('./public/'));

app.use('/api/v1/', routes);

app.get('/', (req, res) => {
    res.render('index', { isAdmin: false });
});

const port = args['port'] || 4040;
const mongo = require('./mongo');
Promise.all([mongo.connect(), app.listen(port)]).then(msgs => {
    console.log(`App runs on http://localhost:${port}`);
}).catch(errors => {
    // throw errors;
});