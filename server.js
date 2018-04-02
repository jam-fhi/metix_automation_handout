const express        = require('express');
const app = new express();
const port = 3000;

app.use(express.static('public'));
app.listen(port, () => {
  console.log('We are live on ' + port);
});