import React from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { HiMail, HiLockOpen } from 'react-icons/hi';
import loginImage from './undraw_enter_uhqk.svg';
import { setUserSession } from '../../utils/Common';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = event => {
    // name attribute
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePostLogin = event => {
    event.preventDefault();
    console.log(this.state);
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('http://localhost:8000/login', userData, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        console.log(res);
        setUserSession(res.data.token, res.data.user);
        this.props.history.push('/todo');
      })
      .catch(err => {
        console.log(err);
        if (err.res.status === 401) return err.res.data.message;
      });
  };

  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(res => {
  //       this.setState({users: res.date});
  //       // console.log(res);
  //     });
  // }

  render() {
    // const users = this.state.users.map(user => {
    //   return
    // });

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form className="auth-form" onSubmit={this.handlePostLogin}>
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
          {/* <Link to="/todo"> */}
            <button
              type="submit"
              className="btn"
              // onClick={this.handlePostLogin}
            >
              Login
            </button>
          {/* </Link> */}
        </form>
        <img src={loginImage} alt="" />
      </div>
    );
  }
}
