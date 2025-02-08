import { Component } from "react";
import ProductService from "../services/product.service";
import {crudRouter} from "../Crud-router";
import '../css/EditProduct.css'
class editProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
                this.onChangeQuantityPerYear = this.onChangeQuantityPerYear.bind(this);
        this.onChangePricePerYear = this.onChangePricePerYear.bind(this);    
        this.onChangePricePerMonth = this.onChangePricePerMonth.bind(this);  
        this.onChangeRevenue = this.onChangeRevenue.bind(this);  
        this.onChangeClients = this.onChangeClients.bind(this);  
        this.editProduct = this.editProduct.bind(this); 
        this.getProduct = this.getProduct.bind(this);    
            this.state = {
                selectProduct : {
         id: null,   
          name:"",
        quantityPerYear:"",
          pricePerYear:"",
          pricePerMonth:"",
          revenue:"",
          clients:"",
               }              

        };
      }
      componentDidMount(){
        this.getProduct(this.props.router.params.id)
      }
   onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
name:name,

            }
        }
    })
   }  
   onChangeQuantityPerYear(e) {
    const quantityPerYear = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
quantityPerYear:quantityPerYear,

            }
        }
    })
   }  
   onChangePricePerYear(e) {
    const pricePerYear = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
pricePerYear:pricePerYear,

            }
        }
    })
   } 
   onChangePricePerMonth(e) {
    const pricePerMonth = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
pricePerMonth:pricePerMonth,

            }
        }
    })
   } 
   onChangeRevenue(e) {
    const revenue = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
revenue:revenue,

            }
        }
    })
   } 
   onChangeClients(e) {
    const clients = e.target.value;
    this.setState(function(prevState){
        return{
            selectProduct :{
...prevState.selectProduct,
clients:clients,

            }
        }
    })
   } 
   //get admin by id// 
   getProduct(id) {
    ProductService.get(id)
    .then(response =>{this.setState({
      selectProduct :response.data,
    });
  console.log (response.data);
  
  })
  .catch(err => {
    console.log (err);
  })
  
  }
  //function update admin//
  editProduct(){
    ProductService.update(
this.state.selectProduct._id,
this.state.selectProduct
    )
    .then(response => {
        console.log(response.data);
        this.props.router.navigate('/product')
    })
    .catch(err =>{
        console.log(err);        
    });
  }
  render() {
    const { selectProduct } = this.state;
    return(
<div>
{selectProduct ? (
        <div className="container">
            <div className="row">                
<div className="col-lg-4 col-sm-12 pt-5">
<input type="text" className="form-control custom-border" id="name" value={selectProduct.name}
 onChange={this.onChangeName}/>
</div>
<div className="col-lg-4 col-sm-12 pt-5">
<input type="number" className="form-control custom-border" id="quantityPerYear" value={selectProduct.quantityPerYear}
 onChange={this.onChangeQuantityPerYear}/>    
</div>
<div className="col-lg-4 col-sm-12 pt-5">
<input type="number" className="form-control custom-border" id="pricePerYear" value={selectProduct.pricePerYear}
 onChange={this.onChangePricePerYear}/>
    </div>
    <div className="col-lg-4 col-sm-12 pt-5">
<input type="number" className="form-control custom-border" id="pricePerMonth" value={selectProduct.pricePerMonth}
 onChange={this.onChangePricePerMonth}/>
    </div>
    <div className="col-lg-4 col-sm-12 pt-5">
<input type="number" className="form-control custom-border" id="revenue" value={selectProduct.revenue}
 onChange={this.onChangeRevenue}/>
    </div>
    <div className="col-lg-4 col-sm-12 pt-5">
<input type="text" className="form-control custom-border" id="clients" value={selectProduct.clients}
 onChange={this.onChangeClients}/>
    </div>



<div className="col-12 text-center justify-content-center align-item-center pt-5">
    <button className="btn btn-warning" onClick={this.editProduct}>Edit Product</button>
</div>

            </div>        
        </div>
        ):(
    <h1>Product modified</h1>      
    )};
</div>

    )
  }
}
export default crudRouter(editProduct);