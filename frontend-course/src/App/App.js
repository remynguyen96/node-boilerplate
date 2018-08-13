import { Layout } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isAuth } from '../redux/service';
import Login from '../Login/';
import Register from '../Register/';
import Posts from '../Posts/';
import { RootRouter } from '../router/RootRouter';
import MenuApp from '../router/MenuApp';
import './App.css';


class App extends PureComponent { 

  constructor(props) {
    super(props);
    this.props.isAuthenticate();
  }

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

const mapDispatchToProps = dispatch => ({
  isAuthenticate: () => dispatch(isAuth())
});

export default connect(null, mapDispatchToProps)(App);
