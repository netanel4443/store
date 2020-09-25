import React from 'react';
import './App.css';
import Home from './components/Home'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart';
import TopNavBar from './components/TopNavBar';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <BrowserRouter>
     <div className="App"  >
     <TopNavBar/>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route path='/shopping_cart' component={ShoppingCart}/>
      </Switch>
      
     
     </div>
    </BrowserRouter>
  );
}

export default App;
