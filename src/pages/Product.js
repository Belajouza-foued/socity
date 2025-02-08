import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import   '../css/Product.css';
import { Component } from 'react';
import axios from 'axios';
import ProductService from '../services/product.service';
export default class ListProduct extends Component{
  constructor (props) {
    super (props);
    //input search admin
    this.onchangeSearchName = this.onchangeSearchName.bind(this);
    //get all admins
    this.getProducts = this.getProducts.bind(this);
    //activ admin
    this.setActiveProduct = this.setActiveProduct.bind(this);
    //actualiser la page   
    this.refreshListProduct = this.refreshListProduct.bind(this);
    //afficher list adminpar nom
    this.searchByName = this.searchByName.bind(this);
    this.deleteAllProduct = this.deleteAllProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);



this.state = {
  products: [],
  searchName: "",
  productCourant: null,
  index: -1
};

  }
componentDidMount(){
    this.getProducts();
}
  onchangeSearchName(e) {
    const searchName =e.target.value;
    this.setState({
      searchName:searchName,
    });    
  }
getProducts () {
  ProductService.getAll ()
  .then(response =>{this.setState({
    products :response.data,
  });
console.log (response.data);

})
.catch(err => {
  console.log (err);
})

}
refreshListProduct() {
  this.getProducts ();
  this.setState ({
    productCourant: null,
    index: -1
  })
}
setActiveProduct(product , index) {  
  this.setState({
  productCourant : product,
  index : index
});
}
searchByName(){
    ProductService.findByTitle(this.state.searchName)
    .then(response => {
        this.setState({
            products: response.data

        }); 
        console.log(response.data)
    })
    .catch(err=>{
        console.log(err);
    });
}
deleteAllProduct(){
  ProductService.deleteAll()
  .then(response => {
    console.log(response.data);
    this.refreshListProduct();
  })
  .catch(e => {
    console.log(e)
  });
}
deleteProduct(id) {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cet admin ?")) {
    ProductService.delete(id)
      .then(response => {
        console.log(response.data);
        this.refreshListAdmin();
        alert('product supprimé avec succès');
      })
      .catch(e => {
        console.log(e);
        alert('Erreur lors de la suppression');
      });
  }
}

handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    // Mettez à jour l'état local
    this.setState({
      products: this.state.products.filter(product => product._id !== id)
    });
    alert('product supprimé avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    alert('Erreur lors de la suppression');
  }
};

render () {
  const {searchName , products, productCourant , indexCourant }= this.state; 
  return ( 
    <>
 <div className="container-fluid">
   <div className="row">
   
    <div className='col-lg-9 col-sm-12'>
      
    <div className="input-group">
        <input  className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchName} onChange={this.onchangeSearchName}/>
        <button className="btn btn-outline-success" type="submit" onClick={this.searchByName} >Search</button>
      </div>
    </div>
    <div className="col-lg-12 col-sm-12 d-flex text-align-center justify-content-center pb-5">
    < Link to={'/addProduct'}className='btn btn-success btn-position me-4'>Add new Product</Link>
    < button className='btn btn-danger btn-position' onClick={this.deleteAllProduct}>Delete all admins</button>
    </div>
       <h1 className='pt-3'>Product list</h1>
       <div className="col-lg-12 col-sm-12 pt-3 container-fluid">       
       <table className="table-admin align-middle container-fluid">
       <thead>
          <tr>
          <th>Id</th>
            <th>Nom du Produit</th>
            <th>Quantité Annuelle</th>
            <th>Prix Annuel</th>
            <th>Prix mensuel</th>
            <th>Chiffre d'Affaires</th>
            <th>Clients</th>
            <th>update</th>
            <th className='right-table'>delete</th>
          </tr>
        </thead>
<tbody className='body-table'>
  {products && products.map((
    product, index)=>(    // eslint-disable-next-line no-unused-vars

 <tr className={+(indexCourant === productCourant ? "active": "")} onClick ={() => this.setActiveProduct(product, index)} key={index}>  
  
   <td>
    <span>{product._id}</span>
    </td> 
   <td>
    <span>{product.name}</span>
    </td>  
          <td>
    <span>{product.quantityPerYear}</span>
    </td> 
    <td>
    <span>{product.pricePerYear}</span>
    </td>  
    <td>
    <span>{product.pricePerMonth}</span>
    </td> 
    <td>
    <span>{product.revenue}</span>
    </td>  
    <td>
    <span>{product.clients}</span>
    </td> 
      
    
<td>
     <Link to={"/product/"+ product._id} type="button" className="btn btn-warning">
       Edit
     </Link>
   </td>
   <td>
   <button  className='btn btn-danger btn-position'  onClick={() => this.deleteProduct(product._id)}>
  Delete
</button>
    
   </td>
 </tr>
 ))}

</tbody>
</table>
     </div>
        
   </div>
 </div>
</>)
}
  
}
    
  


