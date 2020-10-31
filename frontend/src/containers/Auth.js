import React from 'react';
import '../App.css';
import './Auth.css';
import { Login, Signup, RightSide } from '../components/Auth';

export class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
    };
  }

  componentDidMount() {
    document.title = 'Login | To-Do App'; // Set page title to Login
    this.rightSide.classList.add('right'); // Add .right by default
  }

  handleTabChange() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      document.title = 'Sign Up | To-Do App';
      // Activate left tab
      this.rightSide.classList.remove('right');
      this.rightSide.classList.add('left');
    } else {
      document.title = 'Login | To-Do App';
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
      <div className="App">
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
    );
  }
}