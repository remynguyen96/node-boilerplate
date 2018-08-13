import { Layout } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../Login/';
import Register from '../Register/';
import Posts from '../Posts/';
import { RootRouter } from '../router/RootRouter';
import MenuApp from '../router/MenuApp';
import './App.css';


class App extends Component {
  render() {
    return ( 
      <Router>
        <Layout>
            <MenuApp /> 
            <Route exact path='/' component={RootRouter} />  
            <Route exact path='/login' component={Login} />  
            <Route exact path='/register' component={Register} />  
            <Route path='/posts' component={Posts} />  
          </Layout>
      </Router>
    );
  }
}

export {
  App
}
