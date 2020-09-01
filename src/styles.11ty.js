const path = require('path')
const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const fileName = 'styles.scss'

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `/scss/${fileName}`)

    return {
      permalink: `${path.basename(fileName, '.scss')}.css`,
      rawFilepath,
    }
  }

  async render({rawFilepath}) {
    const compiledSass = sass.renderSync({
      file: rawFilepath,
    })

    const postcssOpts = [
      autoprefixer({
        grid: false,
      }),
    ]

    return await postcss(postcssOpts)
      .process(compiledSass.css, {from: rawFilepath})
      .then(result => result.css)
  }
}
