const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const cors = require('cors');
// Import des routes


const clientsRoutes = require('./app/routes/clientsRoutes'); // Route CRUD admin
const productsRoutes = require('./app/routes/productsRoutes')

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Pour analyser les requêtes JSON
app.use(cors()); // Pour permettre les requêtes cross-origin


// Connexion à MongoDB
mongoose.set('strictQuery', false); // ou true selon ton besoin
mongoose.connect('mongodb://localhost:27017/socitydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur de connexion à MongoDB:", err));

// Définition des routes

app.use('/api/clients', clientsRoutes); // Routes pour le CRUD admin
app.use('/api/products', productsRoutes); // Routes pour le CRUD admin


// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
