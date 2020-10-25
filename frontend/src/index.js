import React from 'react';
import ReactDOM from 'react-dom';
// Let bring in redux
import { Provider } from 'react-redux'
import store from './store'
// end // redux settings end here
import './bootstrap.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // Let replace the React.StrictMode with Provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
