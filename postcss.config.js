const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({ preset: "default" }),
    purgecss({
      content: [
        "./src/**/*.njk",
        "./src/**/*.html",
        "./src/**/*.md",
        "./src/**/*.js"
      ],
      safelist: [/^btn/, /^hero/, /^carousel/],
    }),
  ],
};
