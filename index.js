const express = require('express');

let app = express();

let stage = 'development';

let config = require('./server/config/config')[stage];

app.set('view engine', 'pug');
app.use('/public', express.static(config.rootPath + '/public'));
app.use('/bower_components', express.static(config.rootPath + '/bower_components'));
app.set('views', config.rootPath + 'server/views');

app.get('/', (req, res) => {
    res.render('home/home');
});



app.listen(config.port, () => console.log('Server running at port : ' + config.port));


