import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/admin/orderlists" component={OrderListScreen} exact />
          <Route path="/admin/productlist" component={ProductListScreen} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
          <Route path="/admin/userlist" component={UserListScreen} exact />
          <Route path="/orders/:id" component={OrderScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/payment" component={PaymentMethodScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen}  />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen}  exact/>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/admin/product/:id" component={ProductEditScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
        
      </main>
      <Footer/>
  
    </Router>
  );
}

export default App;