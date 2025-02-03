const express = require('express');
const Client = require('../models/clients');
const router = express.Router();

router.get('/client/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('products.product');
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
