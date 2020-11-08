import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import instance from '../../axios';

import './Auth.css';
import { HiUser, HiMail, HiLockOpen } from 'react-icons/hi';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isSignedUp: false
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

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
    if (this.state.isSignedUp) {
      return <Redirect to='/login'/>;
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <img src="/undraw_dreamer_gxxi.svg" alt="illustration" />

        <form className="auth-form" onSubmit={this.handleFormSubmit}>
          <h1 className="auth-heading">Sign Up</h1>
          <div className="form-group">
            <label htmlFor="firstName" aria-labelledby="firstName"></label>
            <div className="input-container">
              <i>
                <HiUser />
              </i>
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lastName" aria-labelledby="lastName"></label>
            <div className="input-container">
              <i>
                <HiUser />
              </i>
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email" aria-labelledby="email"></label>
            <div className="input-container">
              <i>
                <HiMail />
              </i>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" aria-labelledby="password"></label>
            <div className="input-container">
              <i>
                <HiLockOpen />
              </i>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          {/* <Link to="/todo"> */}
          <button
            type="submit"
            className="btn"
            onClick={this.handleFormSubmit}
          >
            Sign Up
          </button>
          {/* </Link> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);