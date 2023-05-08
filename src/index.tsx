import React from 'react';
import ReactDOM from 'react-dom/client';
import {Root} from './Root';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);