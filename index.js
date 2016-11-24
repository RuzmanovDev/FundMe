const express = require('express');

let app = express();

let stage = 'development';

let config = require('./server/config/config')[stage];

app.use(express.static(config.rootPath + 'public'));
app.set('view engine', 'pug');
app.set('views', config.rootPath + 'server/views');

app.get('/', (req, res) => {
    res.send('here');
});



app.listen(config.port, () => console.log('Server running at port : ' + config.port));


