module.exports = eleventyConfig => {
  // Pass through directories
  eleventyConfig.addPassthroughCopy('src/scripts.js')

  // More watched files
  eleventyConfig.addWatchTarget('./src/scss/**/*.scss')
  eleventyConfig.addWatchTarget('./src/scripts.js')

  return {
    dir: {
      input: './src'
    }
  }
}
