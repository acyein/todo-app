import React from 'react';
import { HiMail, HiLockOpen } from 'react-icons/hi';
import loginImage from './undraw_enter_uhqk.svg';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form action="">
          <h1>Login</h1>
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
                placeholder="Email"
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
                placeholder="Password"
              />
            </div>
          </div>
          <button type="button" className="btn">
            Login
          </button>
        </form>
        <img src={loginImage} alt="" />
      </div>
    );
  }
}
