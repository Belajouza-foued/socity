const Client = require("../models/clients");

// Ajouter un admin
exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ message: "Le champ name est requis." });
  }

  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    deliveryDate: req.body.deliveryDate, // Date de livraison
products: req.body.products, 
quantityPerMonth: req.body.quantityPerMonth,
pricePerMonth: req.body.pricePerMonth// Si c'est un tableau envoyé depuis le frontend
    
  });

  admin
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
  
  Client.find(condition)
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

  Client.findById(id)
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

  Client.findByIdAndDelete(id)
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
  Client.deleteMany({})
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
 Client.findByIdAndUpdate(id, req.body, {clientFindAndUpdate:false})
 
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