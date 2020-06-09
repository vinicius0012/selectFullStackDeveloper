const express = require('express');
const routes = require('./routes');
require('./database');
const cors = require('cors');

const app = express();

app.use(express.json())

app.use(routes);
app.use(cors());

app.listen(3333);