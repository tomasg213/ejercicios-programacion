const express = require('express');
const app = express();
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
