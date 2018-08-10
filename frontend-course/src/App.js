import { Icon, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom';
import { RootRouter } from './RootRouter';
import { Login } from './Login';
import './App.css';
import logo from './images/logo.png';


class App extends Component {

  navigatePage = (link) => {
    console.log(this.props);
  }

  render() {
    const { Header } = Layout;
    const listMenu = [
      { id: 1, icon: 'home', link: '/', name: 'Homepage' },
      { id: 2, icon: 'user', link: '/login', name: 'Login' }
    ];
    return ( 
      <Router>
        <Layout>
            <Header className="header">
            <img style={{ height: '60px', maxWidth: '100%' }} src={logo} className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px', float: 'right' }}
              >
              {
                listMenu.map((item) => (
                  <Menu.Item key={item.id} onClick={() => this.navigatePage(item.link)}>
                    <span><Icon type={item.icon} />
                      {item.name}
                    </span>
                  </Menu.Item>
                ))
              }
              </Menu>
            </Header>
            <Route exact path='/' render={(props) => <RootRouter />} />  
            <Route exact path='/login' component={Login} />  
          </Layout>
      </Router>
        
    );
  }
}

export default App;
