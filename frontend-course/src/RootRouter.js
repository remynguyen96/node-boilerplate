import { Icon, Layout, Menu } from 'antd';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Homepage } from './Homepage';
import { Posts } from './Posts';
import './RootRouter.css';

class RootRouter extends PureComponent {
  
  render() {
    const { SubMenu } = Menu;
    const { Content, Sider, Footer } = Layout;

    return (
      <Router>
        <Layout>
          <Layout style={{ height: '100vh' }}>
            <Sider width={200} style={{ background: '#fff' }}>
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
              <h4 style={{ textAlign: 'center', padding: 24, fontSize: '18px' }}>Title page</h4>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Route exact path='/' component={Homepage} />  
                <Route path='/posts' component={Posts} />  
              </Content>
            </Layout>
          </Layout>

          <Footer className="footer" >
            <p style={{ textAlign: 'center', fontSize: '14px', display: 'inline' }}>Copyright © 2018. Made with ❤ by Chau Nguyen</p>
          </Footer>  
        </Layout>
      </Router>  
    )
  }
}

export { RootRouter };
