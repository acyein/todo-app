import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { HiUser, HiMail, HiLockOpen } from 'react-icons/hi';
import instance from '../../axios';

import './Auth.css';
import { validEmailRegex, formValid } from '../FormValidity';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isError: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      isSignedUp: false,
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let isError = { ...this.state.isError };

    switch (name) {
      case 'firstName':
        isError.firstName =
          value.length < 1 ? 'First name cannot be empty' : '';
        break;
      case 'lastName':
        isError.lastName = value.length < 1 ? 'Last name cannot be empty' : '';
        break;
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
    // console.log(this.state);

    if (formValid(this.state)) {
      console.info(this.state);
      // console.info('Valid form');
    } else {
      console.error('Invalid form');
    }

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    instance
      .post('/signup', userData)
      .then(res => {
        console.log(res.config.headers);
        if (res.status === 200) {
          this.props.history.push('/signup');
          this.setState({ isSignedUp: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { isError } = this.state;
    if (this.state.isSignedUp) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <img
          src={`${process.env.PUBLIC_URL}/undraw_dreamer_gxxi.svg`}
          alt="illustration"
        />

        <form className="auth-form" onSubmit={this.handleFormSubmit}>
          <h1 className="auth-heading">Sign Up</h1>
          <div className="form-group">
            <label htmlFor="firstName" aria-labelledby="firstName"></label>
            <div className="input-container">
              <i>
                <HiUser />
              </i>
              <input
                className={
                  isError.firstName.length > 0
                    ? 'form-control error'
                    : 'form-control'
                }
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                placeholder="First Name"
                required
              />
              {isError.firstName.length > 0 && (
                <small className="error-msg">{isError.firstName}</small>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" aria-labelledby="lastName"></label>
            <div className="input-container">
              <i>
                <HiUser />
              </i>
              <input
                className={
                  isError.lastName.length > 0
                    ? 'form-control error'
                    : 'form-control'
                }
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                placeholder="Last Name"
                required
              />
              {isError.lastName.length > 0 && (
                <small className="error-msg">{isError.lastName}</small>
              )}
            </div>
          </div>
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
          {/* <Link to="/todo"> */}
          <button type="submit" className="btn" onClick={this.handleFormSubmit}>
            Sign Up
          </button>
          {/* </Link> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
