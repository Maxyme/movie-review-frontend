// import Typography from 'typography'
// import lincolnTheme from 'typography-theme-lincoln'

// const typography = new Typography(lincolnTheme)
// export default typography

// const typography = new Typography({
//     baseFontSize: '18px',
//     baseLineHeight: 1.666,
//     headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
//     bodyFontFamily: ['Georgia', 'serif'],
//     // See below for the full list of options.
//   })
  
//   // Output CSS as string.
//   typography.toString()
  
//   // Or insert styles directly into the <head> (works well for client-only
//   // JS web apps.
//   typography.injectStyles()

//   export default typography



import ReactDOM from 'react-dom/server'
import React from 'react'

import Typography from '../../src/'
import GoogleFont from '../../src/components/GoogleFont'
import theme from '../../src/themes/us-web-design-standard'

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
  if (typeof document !== 'undefined') {
    const googleFonts = ReactDOM.renderToStaticMarkup(React.createFactory(GoogleFont(theme))())
    const head = document.getElementsByTagName('head')[0]
    head.insertAdjacentHTML('beforeend', googleFonts)
  }
}

export default typography