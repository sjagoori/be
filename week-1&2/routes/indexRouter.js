const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  const query = req.query.query
  res.render('indexView', {query: query});
});

module.exports = router;