const router = require('express').Router()
const db = require('../db/db.json')
const fs = require('fs')


router.get('/notes', (req, res) => {
  fs.readFile('db/db.json','utf-8', (err,data) => {
    return err ? console.log(err) : res.json(JSON.parse(data))})
});

module.exports = router


