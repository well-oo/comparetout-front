import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/frontoffice/Home";
import LoginPage from "./component/LoginPage";
import PrivateRoute from "./component/PrivateRoute";
import BackOfficePage from "./component/backoffice/BackOfficePage";
import { history } from "./helper/history";
import HomeProducts from "./component/frontoffice/HomeProducts";
import Product from "./component/frontoffice/Product";

const App = () => {

  return (
      <Router history={history}>
          <div className="App">
              <Header/>
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/login' component={LoginPage}/>
                  <Route exact path='/products/:idProductType' component={HomeProducts}/>
                  <Route exact path='/products/:idProductType/:idProduct' component={Product}/>
                  <PrivateRoute path='/auth'>
                      <BackOfficePage/>
                  </PrivateRoute>
              </Switch>
          </div>
      </Router>
  );
};

export default App;
