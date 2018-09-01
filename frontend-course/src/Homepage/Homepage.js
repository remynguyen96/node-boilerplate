import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Carousel, Card, Icon, Avatar, Layout } from 'antd';
import { fetchPosts, URL_SERVER } from '../redux/service';
import Styles from './Homepage.scss'

const { Meta } = Card;
class Homepage extends PureComponent {
  componentDidMount() {
    const { get_posts, posts } = this.props;
    if (posts === null || !Array.isArray(posts)) {
      get_posts();
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <Layout className={Styles.homePage}>
        <h4 className={Styles.titlePage}>Homepage</h4>
        <Carousel autoplay className={Styles.carouselsPage}>
          <img alt="slider 1" src={`${URL_SERVER}/slider/slider1.jpg`} />
          <img alt="slider 2" src={`${URL_SERVER}/slider/slider2.jpg`} />
          <img alt="slider 3" src={`${URL_SERVER}/slider/slider3.jpg`} />
          <img alt="slider 4" src={`${URL_SERVER}/slider/slider4.jpg`} />
        </Carousel>

        <Layout className={Styles.listCard}>
          {
            posts && posts.map((post) => (
              <Card
              cover={<img alt={post.slug} src={`${URL_SERVER}/products/${post.images}`} />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              key={post.id} className={Styles.cardItem} >
                <Meta
                  avatar={<Avatar src={post.user && `${URL_SERVER}/users/${post.user.avatar}`} />}
                  title={post.title}
                  description={post.description}
                />
              </Card>
            ))
          }
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.application.posts,
});

const mapDispatchToProps = (dispatch) => ({
  get_posts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);