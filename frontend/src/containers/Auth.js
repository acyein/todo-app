import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import '../App.css';
import './Auth.css';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import RightSide from '../components/Auth/RightSide';
// import logo from '../../public/logo.svg';

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
    };
  }
  componentDidMount() {
    document.title = 'Login | Tick Me'; // Set page title to Login
    this.rightSide.classList.add('right'); // Add .right by default
  }

  handleTabChange() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      document.title = 'Sign Up | Tick Me';
      this.props.history.push('/signup');
      // Activate left tab
      this.rightSide.classList.remove('right');
      this.rightSide.classList.add('left');
    } else {
      document.title = 'Login | Tick Me';
      this.props.history.push('/login');
      // Activate right tab
      this.rightSide.classList.remove('left');
      this.rightSide.classList.add('right');
    }

    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }

  render() {
    // Show Login form by default
    const { isLoginActive } = this.state;
    const currentActive = isLoginActive ? 'Login' : 'Sign Up';
    // Show Sign Up text by default, otherwise show Login text
    const tabText = isLoginActive ? 'Sign Up' : 'Login';

    return (
      <div className="Auth">
        <nav className="navbar">
          <div className="navbar-header">
            <Link to="/todos" className="navbar-brand nav-link">
              <img className="logo" src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />
              Tick Me
            </Link>
          </div>
          <ul className="nav">
            <li>
              <NavLink to="/todos" className="nav-link">
                Get Started
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="auth-body">
          <div className="card">
            <div className="container">
              {isLoginActive && (
                <Login containerRef={ref => (this.container = ref)} />
              )}
              {!isLoginActive && (
                <Signup containerRef={ref => (this.tabText = ref)} />
              )}
            </div>
            <RightSide
              tabText={tabText}
              currentActive={currentActive}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.handleTabChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
