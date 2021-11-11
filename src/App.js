import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'antd/dist/antd.css';

import { history } from './redux/store';

import LoginPage from './pages/LoginPage';

const App = () => (
  <ConnectedRouter history={history}>
    <Routes>
      <Route path="/" component={LoginPage} key="home-page" exact />
    </Routes>
  </ConnectedRouter>
);

export default App;
