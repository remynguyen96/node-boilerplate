import { Avatar, Icon, Layout, Menu } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { URL_SERVER } from '../redux/service';
import Homepage from '../Homepage/';
import Posts from '../Posts/';
import Profile from '../Profile/';
import './RootRouter.css';

class RootRouter extends PureComponent {
  
  render() {
    const { SubMenu } = Menu;
    const { Content, Sider, Footer } = Layout;
    const { users, isAuth } = this.props;
    return (
      <Router>
        <Layout>
          <Layout className="homepage-app">
            <Sider width={200} className="menu-app">
              <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                className="menu-left-app"
              >
                <SubMenu key="sub1" title={<span><Icon type="bars" />Menu</span>}>
                  {
                    isAuth && (
                      <Menu.Item key="1">
                        <Link to="/Lauriane.Miller23/profile">
                          <Avatar className="user-avatar" size="large" src={(users && `${URL_SERVER}/users/${users.avatar}`) || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />
                          <span className="user-name">{(users && users.name) || 'Chau'}</span>
                        </Link>
                      </Menu.Item>
                    )
                  }
                  <Menu.Item key="2"><Link to="/">Homepage</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/posts">Posts</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout style={{ padding: '0 24px 24px' }}>
              <Content>
                <Route exact path='/' component={Homepage} />  
                <Route path=':email/profile' component={Profile} />  
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

const mapStateToProps = state => ({
  users: state.application.users,
  isAuth: state.application.isAuth,
});

export default connect(mapStateToProps)(RootRouter);
