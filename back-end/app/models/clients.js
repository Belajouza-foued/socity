const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  deliveryDate: { type: Date, required: true }, // Date de livraison
  products: [{ 
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
    quantityPerMonth: { type: Number, required: true },
    pricePerMonth: { type: Number, required: true }
  }]
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
