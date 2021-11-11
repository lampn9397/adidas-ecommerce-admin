import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
import 'antd/dist/antd.css';

// import { history } from './redux/store';

import LoginPage from './pages/LoginPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
