//Dependencies
const express = require('express');

// call in router files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//Instantiate server and dynamic port
const app = express();
const PORT = process.env.PORT || 5000;

// Static File Folder
app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// activate port
app.listen(PORT, () => {
  console.log(`Port ${PORT} listening...`)
});


