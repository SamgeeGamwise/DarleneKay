module.exports = function (eleventyConfig) {
  // Rebuild when SCSS changes
  eleventyConfig.addWatchTarget("src/styles");

  // Copy compiled assets to output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"]
  };
};
