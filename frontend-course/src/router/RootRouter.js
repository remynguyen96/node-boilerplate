import { Icon, Layout, Menu } from 'antd';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Homepage from '../Homepage/';
import Posts from '../Posts/';
import './RootRouter.css';

class RootRouter extends PureComponent {
  
  render() {
    const { SubMenu } = Menu;
    const { Content, Sider, Footer } = Layout;

    return (
      <Router>
        <Layout>
          <Layout className="homepage-app">
            <Sider width={200} className="menu-app">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" title={<span><Icon type="bars" />Menu</span>}>
                  <Menu.Item key="1"><Link to="/">Homepage</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/posts">Posts</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout style={{ padding: '0 24px 24px' }}>
              <Content>
                <Route exact path='/' component={Homepage} />  
                <Route path='/posts' component={Posts} />  
              </Content>
            </Layout>
          </Layout>

          <Footer className="footer" >
            <p>Copyright © 2018. Made with ❤ by Chau Nguyen</p>
          </Footer>  
        </Layout>
      </Router>  
    )
  }
}

export { RootRouter };
