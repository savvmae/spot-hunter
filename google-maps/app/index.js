import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
//redux imports

import { reducer } from './reducers';

import App from './components/App';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
console.log('grgrgrgrgr')
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
      <App/>
  </Provider>

  , document.getElementById('ReactGMapsApp'));

  