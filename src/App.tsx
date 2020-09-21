import React from 'react';
import './App.css';
import Home from './components/Home'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart';
import TopNavBar from './components/TopNavBar';

function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route path='/shopping_cart' component={ShoppingCart}/>
      </Switch>
      
      <TopNavBar/>
     </div>
    </BrowserRouter>
  );
}

export default App;
