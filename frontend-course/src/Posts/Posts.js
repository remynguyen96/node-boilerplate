import React, { PureComponent } from 'react';
import { Avatar, Card, Icon, Layout } from 'antd';
import { connect } from 'react-redux';
import { URL_SERVER } from '../redux/service';
import Styles from './Posts.scss';

const { Meta } = Card;
class Posts extends PureComponent {
  render() {
    const { posts } = this.props;
    return (
      <div>
        <h2 className={Styles.titlePage}>Posts</h2>
        <Layout className={Styles.listCard}>
          {
            posts && posts.map(post => (
              <Card
              className={Styles.cardItem}
              cover={<img alt={post.slug} src={`${URL_SERVER}/products/${post.images}`} />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              key={post.id} >
                <Meta
                  avatar={<Avatar src={post.user && `${URL_SERVER}/users/${post.user.avatar}`} />}
                  title={post.title}
                  description={post.description}
                />
              </Card>
            ))
          }
        </Layout>
      </div>    
    )
  }
}

const mapStateToProps = state => ({
  posts: state.application.posts
});

export default connect(mapStateToProps)(Posts);

