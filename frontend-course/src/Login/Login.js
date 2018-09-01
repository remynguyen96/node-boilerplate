import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginForm } from '../redux/service';
import Styles from './Login.scss';

const FormItem = Form.Item;
class WrappedLogin extends PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authLogin(values);
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, error, isAuth } = this.props;
    if (isAuth) {
      return (
        <Redirect to='/' />
      ) 
    }
    return (
      <Form onSubmit={this.handleSubmit} className={Styles.loginForm}>
        <h2 className={Styles.titlePage}>Login</h2>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!',},
              { required: true, message: 'Please input your email!' },
            ],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Link className={Styles.loginFormForgot} to="/forgot-password">Forgot password</Link>
          <Button type="primary" htmlType="submit" className={Styles.loginFormButton}>
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
          {error && <p className={Styles.error}>{error}</p>}
          </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(WrappedLogin);

const mapStateToProps = state => ({
  error: state.application.error_login,
  isAuth: state.application.isAuth,
});


const mapDispatchToProps = dispatch => ({
  authLogin: (info) => dispatch(loginForm(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
