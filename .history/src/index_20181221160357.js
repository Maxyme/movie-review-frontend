import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { TypographyStyle, GoogleFont } from 'react-typography'
// Best practice is to have a typography module
// where you define your theme.
import typography from './typography'

ReactDOM.render(<html>
    <head>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
    </head>
    <body>
    Typography.js
    </body>
  </html>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
