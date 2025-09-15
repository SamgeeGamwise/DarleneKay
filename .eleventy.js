module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("src/styles");
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/script"); // watch for changes
  eleventyConfig.addPassthroughCopy({ "src/script": "script" }); // copy to _site/assets/js

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    pathPrefix: "/",
  };
};
