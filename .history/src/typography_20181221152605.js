// import Typography from 'typography'
// import lincolnTheme from 'typography-theme-lincoln'

// const typography = new Typography(lincolnTheme)
// //typography.injectStyles()
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


// @ resources/assets/scripts/routes/common.js
import Typography from 'typography';

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