import { Icon, Layout, Menu } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { URL_SERVER, TOKEN, logoutPage } from '../redux/service';
import './RootRouter.css';

class MenuApp extends PureComponent {

  navigatePage = (link) => {
    const { history, logoutPage } = this.props;
    if (link === '/logout' && window.localStorage.getItem(TOKEN)) {
      logoutPage();
      return (<Redirect to='/login' />);
    }
    history.push(link);
  }

  render() {
    const { Header } = Layout;
    let listMenu = [
      { id: 1, icon: 'home', link: '/', name: 'Homepage' },
      { id: 3, icon: 'user', link: '/login', name: 'Login' },
    ];
    if (window.innerWidth <= 768) {
      listMenu = [
        { id: 1, icon: 'home', link: '/', name: 'Homepage' },
        { id: 2, icon: 'appstore', link: '/posts', name: 'Posts' },
        { id: 3, icon: 'user', link: '/login', name: 'Login' },
      ];
    }
    if (this.props.isAuth) {
      listMenu = listMenu.map((item) => {
        if (item.id === 3) {
          item.icon = 'logout';
          item.link = '/logout';
          item.name = 'Logout';
        }
        return item;
      });
    }
    return ( 
      <Header className="header">
        <Link to="/">
          <img className="logo-app" alt="logo" src={`${URL_SERVER}/logo.png`} />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          className="navigate-app"
          defaultSelectedKeys={['1']}
        >
          {
            listMenu.map((item) => (
              <Menu.Item className="navigate-item" key={item.id} onClick={() => this.navigatePage(item.link)}>
                <span><Icon type={item.icon} />
                  {item.name}
                </span>
              </Menu.Item>
            ))
          }
        </Menu>
      </Header>
    );
  }
}


const mapStateToProps = state => ({
  isAuth: state.application.isAuth
});


const mapDispatchToProps = dispatch => ({
  logoutPage: () => dispatch(logoutPage())
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuApp));