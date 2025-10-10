import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore } from 'redux';
import allReducers from './reducers/index.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
const store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <BrowserRouter>
        <App />  
    </BrowserRouter>
  </Provider>
);
