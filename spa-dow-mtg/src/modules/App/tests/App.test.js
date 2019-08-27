import React from 'react';
import ReactDOM from 'react-dom';
import * as App from '../index.app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App.index.default />, div);
  ReactDOM.unmountComponentAtNode(div);
});
