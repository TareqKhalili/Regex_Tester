const app = require('express')();
const serveStatic = require('serve-static');
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.listen(PORT);
