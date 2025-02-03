const Product = require("../models/products");

// Ajouter un admin
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Le champ name est requis." });
  }

  const product = new Product({
    name: req.body.name,
    quantityPerYear : req.body.quantityPerYear,
    pricePerYear: req.body.pricePerYear,
    pricePerMonth: req.body.pricePerMonth, // Date de livraison
    revenue: req.body.revenue, 
    clients: req.body.clients,

    
  });

  product
    .save()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de la création de l'admin.",
      })
    );
};

// Trouver tous les admins
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
  Product.find(condition)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message || "Erreur lors de la récupération des admins.",
      })
    );
};

// Trouver un admin par ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "Admin non trouvé avec id=" + id });
      }
      res.send(data);
    })
    .catch(err =>
      res.status(500).send({
        message: "Erreur lors de la récupération de l'admin avec id=" + id,
      })
    );
};

// Supprimer un admin par ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Impossible de supprimer l'admin avec id=${id}.` });
      }
      res.send({ message: "Admin supprimé avec succès !" });
    })
    .catch(err =>
      res.status(500).send({
        message: "Erreur lors de la suppression de l'admin avec id=" + id,
      })
    );
};

// Supprimer tous les admins
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} admins supprimés avec succès.`,
      });
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Erreur lors de la suppression des admins.",
      })
    );
};

// Mettre à jour un admin par ID
exports.update = (req,res) => {
  if(!req.body) {
   return res.status(400).send({
     message:"data can not be empty"
   });
  }  
 const id = req.params.id;
 Product.findByIdAndUpdate(id, req.body, {productFindAndUpdate:false})
 
 .then(data =>{
   if(!data) {
     res.status(400).send ({
       message:`can not update with id=${id}`
     });
   }
   else res.send ({
     message:"admin id updated"
   })
 })
 .catch(err => {
   res.status(500).send({
     message:"error updating admin with id=" + id
   });
 });
 
 }