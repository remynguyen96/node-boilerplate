import { Layout } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Styles from './Profile.scss';

class Profile extends PureComponent {

  componentDidMount() {
    // const { get_posts, posts } = this.props;
    // if (posts === null || !Array.isArray(posts)) {
    //   get_posts();
    // }
  }

  render() {
    // const { user } = this.props;
    // console.log(this.props);
    return (
      <Layout>
        <h4 className={Styles.titlePage}>Profile</h4>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.application.users,
});

// const mapDispatchToProps = (dispatch) => ({
//
// });

export default connect(mapStateToProps)(Profile);
// export default connect(mapStateToProps, mapDispatchToProps)(Profile);