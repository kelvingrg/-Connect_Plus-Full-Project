import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './App/ReduxHandlers/store'

import {PersistGate}  from 'redux-persist/es/integration/react' // for persist state 
import { persistStore } from 'redux-persist';  // for persist state 


const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor =persistStore(store)
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

