import * as React from 'react';
import { render } from 'react-dom';

import whoami from './whoami';

import './index.css';

render(
  <div className="container">
    <h1>Hello, World!</h1>
    <p>{ whoami('react') }</p>
  </div>,
    document.getElementById('mount-point'),
);
