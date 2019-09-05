import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as routes from '../index.routes';
import { Container } from 'reactstrap';

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <routes.default />
      </Container>
    </BrowserRouter>
  );
}

export default App;
