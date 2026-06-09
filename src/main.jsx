import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import Root from './Root.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div id="stage">
      <div id="root-app">
        <Root />
      </div>
    </div>
  </React.StrictMode>,
);
