import React from 'react';
import { HiUser, HiMail, HiLockOpen } from 'react-icons/hi';
import signupImage from './undraw_dreamer_gxxi.svg';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <img src={signupImage} alt="" />

        <form action="">
          <h1>Sign Up</h1>
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
                placeholder="First Name"
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
                placeholder="Last Name"
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
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
