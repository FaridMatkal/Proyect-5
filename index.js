var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();
var upload = multer(); // Inicializa multer

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Maneja la carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Enviar la información del archivo en la respuesta JSON
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Manejo de errores
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

