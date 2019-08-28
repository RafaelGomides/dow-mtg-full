import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as routes from '../index.routes';

const App = () => {
  return (
    <BrowserRouter>
      <routes.default />
    </BrowserRouter>
  );
}

export default App;
