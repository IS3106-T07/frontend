import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { App } from './components/App';
import * as serviceWorker from './helpers';
// setup fake backend
import { configureFakeBackend } from './helpers';

export const apiUrl = 'http://localhost:3000';

configureFakeBackend();

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
)

serviceWorker.register();   
