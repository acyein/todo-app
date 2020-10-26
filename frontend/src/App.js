import React from 'react';
import './App.css';
import { Login, Signup } from './components/Auth';

class App extends React.Component {
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
  
  // Event handlers
  changeState() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      document.title = 'Register | To-Do App';
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
    const currentActive = isLoginActive ? 'Login' : 'Register';
    // Show Register text by default, otherwise show Login text
    const tabText = isLoginActive ? 'SIGN UP' : 'LOGIN';
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
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="tab-container">
        <span className="tab-text">{props.tabText}</span>
      </div>
    </div>
  );
};

export default App;
