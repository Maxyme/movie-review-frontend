import Typography from 'typography'
import lincolnTheme from 'typography-theme-lincoln'

const typography = new Typography(lincolnTheme)

var css = typography.toString()
console.log(css)
export default typography.toString()
