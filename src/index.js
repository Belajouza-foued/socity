import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

const App = () => {
  
  return (
    <>
          <Routes>
               <Route path="/" element={<Product />} />
               <Route path="addProduct" element={<AddProduct />} />
               <Route path="/product/:id" element={<EditProduct />} />
       
      </Routes>
    
    </>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
