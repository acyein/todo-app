import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from './containers/Auth';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/" exact component={Auth} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
