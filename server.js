const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// use router
app.use('/upload', require('./routers/localUpload'));
app.use('/upload-server', require('./routers/serverUpload'));


app.listen(3000, () => {
    console.log('App server is now listening');
});