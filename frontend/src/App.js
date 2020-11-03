import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Auth } from './containers/Auth';
import { Todo } from './containers/Todo';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/todo" component={Todo} />
          <Route path="/login" component={Auth} />
          <Route path="/" exact component={Todo} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
