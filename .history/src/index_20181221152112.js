import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



import Typography from '../../src/'
//import GoogleFont from '../../src/components/GoogleFont'
//import theme from '../../src/themes/us-web-design-standard'

const typography = new Typography()

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
  if (typeof document !== 'undefined') {
    //const googleFonts = ReactDOM.renderToStaticMarkup(React.createFactory(GoogleFont(theme))())
    const head = document.getElementsByTagName('head')[0]
    head.insertAdjacentHTML('beforeend', googleFonts)
  }
}

export default typography

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
