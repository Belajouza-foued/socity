const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantityPerYear: { type: Number, required: true }, // Quantité par an
  pricePerYear: { type: Number, required: true }, // Prix total annuel
  pricePerMonth: { type: Number, required: true }, // Prix par mois
  revenue: { type: Number, required: true }, // Chiffre d'affaires
  clients:  { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);


