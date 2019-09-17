const express = require('express');
const app = express.Router();
const Problem = require('./controllers/Problem');

app.get('/problems/:_id?', Problem.get);
app.post('/problems', Problem.post);
app.put('/problems/:_id', Problem.put);
app.delete('/problems/:_id', Problem.delete);

module.exports = app;