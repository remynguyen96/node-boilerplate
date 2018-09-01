import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App/';
import registerServiceWorker from './registerServiceWorker';

const ConfigureProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<ConfigureProvider />, document.getElementById('root') || document.createElement('div'));
registerServiceWorker();
