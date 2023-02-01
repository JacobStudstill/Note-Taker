const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes')
const fs = require('fs')

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//API information up here
app.use('/api', apiRoutes)



//get notes does not work
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//Kepp this at the button because it is the index which goes last
app.get('*' , (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);