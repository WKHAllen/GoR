const express = require('express');
const path = require('path');

const publicDir = 'public';
const errorDir = path.join(__dirname, publicDir, 'errors');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, publicDir)));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(errorDir, '404.html'));
});

app.use((err, req, res, next) => {
    res.status(500).sendFile(path.join(errorDir, '500.html'));
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
