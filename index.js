const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const router = require('./src/routes/good');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/good', router);

app.listen(3000, () => {
  console.log('Port 3000');
});
