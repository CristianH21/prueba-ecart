import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import Orders from './views/Orders';
import Order from './views/Order';
import AddProduct from './views/AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faUsers, faUser, faSpinner);

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: process.env.REACT_APP_TOKEN
  }
});

function App() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchData = async () => {
    const result = await authAxios.get('/orders');
    setOrders(result.data.orders);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onAddProduct = (product, id) => {
    const modOrders = orders.map(ele => {
      if (ele.id === id) {
        ele.items.push(product);
        ele.status.ecartapi = 'pending payment';
        ele.totals.total = ( parseFloat(ele.totals.total) + parseFloat(product.price * product.quantity)).toFixed(2).toString();
      }
      return ele;
    });
    setOrders(modOrders);
  } 

  const onPayOrder = (orderId, orderNumber) => {
    const modOrders = orders.map(ele => {
    if (ele.id === orderId) {
      ele.status.ecartapi = 'paid';
    }
      return ele;
    });
    setOrders(modOrders);
    setAlertMessage(`You have succesfully paid order number ${orderNumber}`);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  if (loading) {
    return (
      <span>Loading...</span>
    )
  } else {
    return (
      <Router>
        <Header />
        <div className="App">
          <Container>
            <Alert show={show} variant={'success'}>
              {alertMessage}
            </Alert>
            <Switch>
              <Route path="/order/:id/product/add">
                <AddProduct addProduct={onAddProduct}/>
              </Route>
              <Route path="/order/:id">
                <Order orders={orders} payOrder={onPayOrder}/>
              </Route>
              <Route path="/">
                <Orders orders={orders}/>
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
  
}

export default App;
