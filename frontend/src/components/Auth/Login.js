import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import instance from '../../axios';

import './Auth.css';
import { HiMail, HiLockOpen } from 'react-icons/hi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
    };
  }
  
  handleInputChange = event => {
    // name attribute
    this.setState({ [event.target.name]: event.target.value });
  };
  
  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    
    instance
    .post('/login', userData)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.history.push('/login');
        this.setState({ isLoggedIn: true });
      }
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/todo" />;
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
          <button type="submit" className="btn" onClick={this.handleFormSubmit}>
            Login
          </button>
        </form>
        <img src="/undraw_enter_uhqk.svg" alt="illustration" />
      </div>
    );
  }
}

export default withRouter(Login);