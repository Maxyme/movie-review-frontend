import Typography from 'typography'
import lincolnTheme from 'typography-theme-lincoln'

lincolnTheme.baseFontSize = '16px' // was 20px.
lincolnTheme.googleFonts =  [
    {
      name: 'Montserrat',
      styles: [
        '700',
      ],
    },
    {
      name: 'Merriweather',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ]

const typography = new Typography(lincolnTheme)
export default typography
