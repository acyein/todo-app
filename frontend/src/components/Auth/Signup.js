import React from 'react';
import { HiUserCircle, HiAtSymbol, HiLockOpen } from 'react-icons/hi';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <h1>SIGN UP</h1>

        <form action="">
          <div className="form-group">
            <label htmlFor="username" aria-labelledby="username"></label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="Username"
            />
            <i>
              <HiUserCircle />
            </i>
          </div>
          <div className="form-group">
            <label htmlFor="email" aria-labelledby="email"></label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
            <i>
              <HiAtSymbol />
            </i>
          </div>
          <div className="form-group">
            <label htmlFor="password" aria-labelledby="password"></label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
            />
            <i>
              <HiLockOpen />
            </i>
          </div>
          <button type="button" className="btn">
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}
