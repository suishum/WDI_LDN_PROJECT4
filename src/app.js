import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import EmployerIndex from './components/employers/IndexRoute';
import EmployerShow from './components/employers/ShowRoute';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          {/* <FlashMessages /> */}
          <section className="section">
            <Switch>
              {/* <Route path="/employers/:id/edit" component={EditRoute} /> */}
              {/* <Route path="/employers/new" component={NewRoute} /> */}
              <Route path="/employers/:id" component={EmployerShow} />
              <Route path="/employers" component={EmployerIndex} />
              {/* <Route path="/register" component={Register} /> */}
              {/* <Route path="/login" component={Login} /> */}
              {/* <Route component={NotFound} /> */}
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
