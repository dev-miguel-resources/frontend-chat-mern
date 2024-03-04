import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@redux-toolkit/store'; // almacen de datos del estado global
import App from '@root/App';
import '@root/index.scss';

// archivo de entrada a la app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
