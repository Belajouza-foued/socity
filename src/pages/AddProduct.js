import React, { Component } from "react";
import ProductService from "../services/product.service";
import   '../css/AddProduct.css';
import { crudRouter } from '../Crud-router';
 class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        
        this.onChangeQuantityPerYear = this.onChangeQuantityPerYear.bind(this);
        this.onChangePricePerYear = this.onChangePricePerYear.bind(this);   
        this.onChangePricePerMonth = this.onChangePricePerMonth.bind(this);  
        this.onChangeRevenue = this.onChangeRevenue.bind(this);  
        this.onChangeClients = this.onChangeClients.bind(this);      

        this.saveAddProduct = this.saveAddProduct.bind(this);
        this.AddProduct = this.AddProduct.bind(this);
     
    
        this.state = {
          id: null,
        
          name:"",
          
          quantityPerYear:"",
          pricePerYear:"",
          pricePerMonth:"",
          revenue:"",
          clients:"",
          submitted: false

        };
      }
    
      onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }
    
      
      onChangeQuantityPerYear(e) {
        this.setState({
          quantityPerYear: e.target.value
        });
      }
      onChangePricePerYear(e) {
        this.setState({
          pricePerYear: e.target.value
        });
      }
      onChangePricePerMonth(e) {
        this.setState({
          pricePerMonth: e.target.value
        });
      }
      onChangeRevenue(e) {
        this.setState({
          revenue: e.target.value
        });
      }
      onChangeClients(e) {
        this.setState({
          clients: e.target.value
        });
      }
      saveAddProduct() {
        var data = {
          name: this.state.name,          
          quantityPerYear:this.state.quantityPerYear,
          pricePerYear:this.state.pricePerYear,
          pricePerMonth:this.state.pricePerMonth,
          revenue:this.state.revenue,
          clients:this.state.clients,
        };
    
        ProductService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              name:response.data.name,
              quantityPerYear:response.data.quantityPerYear,
              pricePerYear:response.data.pricePerYear,
              pricePerMonth:response.data.pricePerMonth,
              revenue:response.data.revenue,
              clients:response.data.clients,
            
                          
            });
         })
         .then(
          () => {
            this.props.router.navigate("/");
            window.location.reload();
          }
        );
      }    
    
      AddProduct() {
        this.setState({
            id: null,        
            name:"",            
            quantityPerYear:"",
          pricePerYear:"",
          pricePerMonth:"",
          revenue:"",
          clients:"",
          submitted: false
        });
      }
render() {
  return (
    <div className="container add-container">
        <div className="row">
           
        <div className="col-lg-12 col-sm-12  pt-5 form-add">
    <div className="submit-form ">
      {this.state.submitted ? (
        <div>
                  
        </div>
      ) : (
        <div className="container bg-info form-container">
          <div className="form-group">
            <label htmlFor="nom">nom</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.name}
              onChange={this.onChangeName}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantityPerYear">Quantite Par An</label>
            <input
              type="number"
              className="form-control"
              id="quantityPerYear"
              required
              value={this.state.quantityPerYear}
              onChange={this.onChangeQuantityPerYear}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor=" pricePerYear">Prix Par an</label>
            <input
              type="number"
              className="form-control"
              id=" pricePerYear"
              required
              value={this.state.pricePerYear}
              onChange={this.onChangePricePerYear}
              name=" pricePerYear"           />         
          
          </div>
          <div className="form-group">
            <label htmlFor=" pricePerMonth">Prix Par Mois</label>
            <input
              type="number"
              className="form-control"
              id=" pricePerMonth"
              required
              value={this.state.pricePerMonth}
              onChange={this.onChangePricePerMonth}
              name=" pricePerMonth"           />         
          
          </div>
          <div className="form-group">
            <label htmlFor="revenue">Chiffre d Affaires</label>
            <input
              type="number"
              className="form-control"
              id="revenue"
              required
              value={this.state.revenue}
              onChange={this.onChangeRevenue}
              name="revenue"           />         
          
          </div>
          <div className="form-group">
            <label htmlFor="clients">Clients</label>
            <input
              type="text"
              className="form-control"
              id="clients"
              required
              value={this.state.clients}
              onChange={this.onChangeClients}
              name="clients"           />         
          
          </div>
          <div className="button-add">
          <button onClick={this.saveAddProduct} className="btn btn-success mt-5">
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
  );
}
}
export default crudRouter(AddProduct);
