const express = require('express');
const products = require('../controllers/productsControllers');  
const router = express.Router();

// Créer un nouvel admin
router.post('/', products.create);  

// Récupérer tous les admins
router.get('/', products.findAll);      

// Récupérer un admin spécifique avec son ID
router.get('/:id', products.findOne);

// Mettre à jour un admin avec son ID
router.put('/:id', products.update);

// Supprimer un admin avec son ID
router.delete('/:id', products.delete);

// Supprimer tous les admins
router.delete('/', products.deleteAll);

module.exports = router;  // Exporter le routeur
