import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import Typography from 'typography'
// import lincolnTheme from 'typography-theme-lincoln'

// const typography = new Typography(lincolnTheme)

// // Output CSS as string.
// typography.toString()

// // Or insert styles directly into the <head> (works well for client-only
// // JS web apps.
// typography.injectStyles()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
