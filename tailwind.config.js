module.exports = {
  content: [
    "./src/**/*.{njk,md,html}",   // all templates
    "./_site/**/*.html"           // built output (optional but safe)
  ],
  theme: {
    extend: {},
  },
  plugins: ["@tailwindcss/postcss"],
}
