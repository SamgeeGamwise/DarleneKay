module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/styles");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    pathPrefix: "/",
  };
};
