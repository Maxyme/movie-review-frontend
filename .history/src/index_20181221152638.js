import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Typography from 'typography';
// import typography from './typography';
// typography.injectStyles()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

// @ resources/assets/scripts/routes/common.js


export default {
  init() {
    const typography = new Typography({
      baseFontSize: '18px',
      baseLineHeight: 1.45,
      headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      bodyFontFamily: ['Georgia', 'serif'],
    })

    typography.injectStyles()
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};