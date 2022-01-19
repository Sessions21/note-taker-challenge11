const router = require('express').Router();
const fs = require('fs')
const util = require('util');

//read-write async processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//API GET route
router.get('/notes', (req, res) => {
  readFileAsync('./db/db.json', 'utf8').then(data => {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

//API POST route
router.post('/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./db/db.json', 'utf8').then( data => {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
  }).then( notes => {
    writeFileAsync('./db/db.json', JSON.stringify(notes))
    res.json(note);
  })
});


//API Delete route
router.delete('/notes/:id', (req, res) => {
  const id = req.params.id
  console.log(req.params.id);
  notes = notes.filter(note => note.id != id);

  fs.writeFileSync('./db/db.json', JSON.stringify
  (notes), function(error){
    if (error){
    console.log(error)};
  });
  
  res.json ({
    message: 'deleted',
    //change: req.params.id,
    data:id
  });

  res.end();
});

module.exports = router