import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Carousel, Card, Icon, Avatar, Layout } from 'antd';
import { fetchPosts, URL_SERVER } from '../redux/service';
import './Homepage.css'

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
      <Layout>
        <h4 className="title-page">Homepage</h4>
        <Carousel autoplay>
          <div><img alt="slider 1" src={`${URL_SERVER}/slider/slider1.jpg`} /></div>
          <div><img alt="slider 2" src={`${URL_SERVER}/slider/slider2.jpg`} /></div>
          <div><img alt="slider 3" src={`${URL_SERVER}/slider/slider3.jpg`} /></div>
          <div><img alt="slider 4" src={`${URL_SERVER}/slider/slider4.jpg`} /></div>
        </Carousel>

        <Layout className="list-card">
          {
            posts && posts.map((post) => (
              <Card
              cover={<img alt={post.slug} src={`${URL_SERVER}/products/${post.images}`} />}
              actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
              key={post.id}
              >
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