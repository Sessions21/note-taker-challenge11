//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

//read-write async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Instantiate server and dynamic port
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static File Folder
app.use(express.static('./public'));

//API GET route
app.get('/api/notes', (req, res) => {
  readFileAsync('./db/db.json', 'utf8').then(data => {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

//API POST route
app.post('/api/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./db/db.json', 'utf8').then( data => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
  }).then( notes => {
    writeFileAsync('.db/db.json', JSON.stringify(notes))
    res.json(note);
  })
});



// activate port
app.listen(PORT, () => {
  console.log(`Port ${PORT} listening...`)
});


