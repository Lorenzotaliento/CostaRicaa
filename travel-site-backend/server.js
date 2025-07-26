const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Aggiungi questa riga per caricare .env

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connessione a MongoDB riuscita'))
  .catch(err => console.error('Errore di connessione a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Backend attivo!');
});

app.listen(port, () => {
  console.log(`Server in ascolto su porta ${port}`);
});