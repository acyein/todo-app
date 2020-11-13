import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { HiMail, HiLockOpen } from 'react-icons/hi';
import instance from '../../axios';

import './Auth.css';
import { validEmailRegex, formValid } from '../FormValidity';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isError: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let isError = { ...this.state.isError };

    // Error messages for invalid input values
    switch (name) {
      case 'email':
        isError.email = validEmailRegex.test(value) ? '' : 'Invalid email';
        break;
      case 'password':
        isError.password =
          value.length < 8 ? 'Must contain at least 8 characters' : '';
        break;
      default:
        break;
    }

    this.setState({ isError, [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    // Set validity of login form
    if (formValid(this.state)) {
      console.info(this.state);
      // console.info('Valid form');
    } else {
      console.error('Invalid form');
    }

    // User's input to be passed in POST request (properties have to match those defined in backend)
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // POST request
    instance
      .post('/login', userData)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/login');
          this.setState({ isLoggedIn: true });
          localStorage.setItem('token', res.data.token);
          console.log(res.config.headers);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { isError } = this.state;
    if (this.state.isLoggedIn === true) {
      return <Redirect to="/todos" />;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form className="auth-form" onSubmit={this.handleFormSubmit}>
          <h1 className="auth-heading">Login</h1>
          <div className="form-group">
            <label htmlFor="email" aria-labelledby="email"></label>
            <div className="input-container">
              <i>
                <HiMail />
              </i>
              <input
                className={
                  isError.email.length > 0
                    ? 'form-control error'
                    : 'form-control'
                }
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="Email"
                required
              />
              {isError.email.length > 0 && (
                <small className="error-msg">{isError.email}</small>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" aria-labelledby="password"></label>
            <div className="input-container">
              <i>
                <HiLockOpen />
              </i>
              <input
                className={
                  isError.password.length > 0
                    ? 'form-control error'
                    : 'form-control'
                }
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
                required
              />
              {isError.password.length > 0 && (
                <small className="error-msg">{isError.password}</small>
              )}
            </div>
          </div>
          <button type="submit" className="btn" onClick={this.handleFormSubmit}>
            Login
          </button>
        </form>
        <img
          src={`${process.env.PUBLIC_URL}/undraw_enter_uhqk.svg`}
          alt="illustration"
        />
      </div>
    );
  }
}

export default withRouter(Login);
