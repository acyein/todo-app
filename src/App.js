import React from 'react';
import './App.css';
import { Login, Register } from './components/Auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
    };
  }

  // Event handlers
  componentDidMount() {
    document.title = 'Login | To-Do';
    this.rightSide.classList.add('right'); // Add .right by default
  }

  changeState() {
    const { isLoginActive } = this.state;
    // Activate left tab
    if (isLoginActive) {
      document.title = 'Register';
      this.rightSide.classList.remove('right');
      this.rightSide.classList.add('left');
    } else { 
      // Activate right tab
      document.title = 'Login';
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
              <Register containerRef={ref => (this.tabText = ref)} />
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
      <div className="inner-container">
        <div className="text">{props.tabText}</div>
      </div>
    </div>
  );
};

export default App;
