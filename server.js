const {graphql} = require('graphql');
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const Schemas = require('./schemas');

mongoose.connect('mongodb://localhost/notes');

app.use(express.static('.'));

app.use('/topics', graphqlHTTP({schema: Schemas.topics}))

app.listen('3000',() => console.log('App on 3000'));
