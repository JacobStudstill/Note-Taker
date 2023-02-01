const router = require('express').Router()
const db = require('../db/db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

//Get for the router
router.get('/notes', (req, res) => {
  fs.readFile('db/db.json','utf-8', (err,data) => {
    return err ? console.log(err) : res.json(JSON.parse(data))})
});

router.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };

    res.json(newNote)

    fs.readFile('db/db.json','utf-8', (err,data) => {
      if (err) {
        console.error(err);
      } else {
        
        const parsedReviews = JSON.parse(data);

        parsedReviews.push(newNote);

        fs.writeFile(
          'db/db.json',
          JSON.stringify(parsedReviews, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated Notes!')
              
        );
      }
    });
    
  } 
});

router.delete('/notes/:id', (req, res) => {
  let deleteid = req.params.id;
  fs.readFile('db/db.json', 'utf8', (err, data) => {
      if (err) {
          console.log(err);
      }
      let noteData = JSON.parse(data);
      for(let i = 0; i < noteData.length; i++) {
          if (deleteid == noteData[i].id) {
              noteData.splice(i, 1);
              fs.writeFile('db/db.json', JSON.stringify(noteData, null, 4), (err) => {
                  if (err) {
                      console.log(err);
                  } else {
                       console.log('The note is gone!');
                  }
              });
          };
      };
  });

  res.end();

});

module.exports = router


