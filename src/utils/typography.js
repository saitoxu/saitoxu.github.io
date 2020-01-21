import Typography from "typography"
// import Wordpress2016 from "typography-theme-wordpress-2016"
// import theme from "typography-theme-default"

// Wordpress2016.overrideThemeStyles = () => {
//   return {
//     "a.gatsby-resp-image-link": {
//       boxShadow: `none`,
//     },
//   }
// }

// delete Wordpress2016.googleFonts

// theme.bodyFontFamily = [
//   '-apple-system',
//   'BlinkMacSystemFont',
//   'Helvetica Neue',
//   'Hiragino Sans',
//   "游ゴシック Medium",
//   "YuGothic",
//   "Hiragino Kaku Gothic ProN",
//   "メイリオ",
//   "Meiryo,sans-serif"
// ]

// const typography = new Typography(theme)

const typography = new Typography({
  bodyFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Helvetica Neue",
    "Hiragino Sans",
    "游ゴシック Medium",
    "YuGothic",
    "Hiragino Kaku Gothic ProN",
    "メイリオ",
    "Meiryo,sans-serif",
  ],
  bodyColor: "hsla(0,0%,0%,0.8)",
  overrideStyles: ({ _adjustFontSizeTo, _scale, rhythm }, _options) => {
    const linkColor = "#007acc"
    return {
      a: {
        color: linkColor,
        textDecoration: "none",
      },
      "a:visited": {
        color: linkColor,
      },
      code: {
        fontSize: '1em'
      }
    }
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
