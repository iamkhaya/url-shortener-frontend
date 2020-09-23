import React from 'react';
import ReactDOM from 'react-dom';

import './styles/bootstrap.min.css';
import './styles/custom.scss';
import './styles/index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ShortUrlMetrics from './containers/short_url_metrics';
import FileUpload from './containers/file_upload';
import Home from './containers/home';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/shorten">
          <Home />
        </Route>
        <Route path="/metrics">
          <ShortUrlMetrics />
        </Route>
        <Route path="/upload">
          <FileUpload />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
