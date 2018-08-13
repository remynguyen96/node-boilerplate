import { Icon, Layout, Menu } from 'antd';
import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { URL_SERVER, isAuth, TOKEN } from '../redux/service';
import './RootRouter.css';

class MenuApp extends PureComponent {

  navigatePage = (link) => {
    const { history } = this.props;
    if (link === '/logout' && window.localStorage.getItem(TOKEN)) {
      window.localStorage.removeItem(TOKEN);
      history.push('/login');
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
    if (isAuth()) {
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

export default withRouter(MenuApp);

