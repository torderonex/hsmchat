import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import Store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
const store = new Store();

export const Context = createContext({
  store,

});

document.querySelector('body').style.backgroundColor = 'rgba(0, 128, 0, 0.567)';
document.querySelector('title').innerHTML = 'HSMchat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{store}}>
    <BrowserRouter>
      <Header/>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
