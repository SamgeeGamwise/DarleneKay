module.exports = function (eleventyConfig) {
  // Watch source assets for live reload
  eleventyConfig.addWatchTarget("src/assets/styles");
  eleventyConfig.addWatchTarget("src/assets/js");

  // Static assets passthrough
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/videos": "assets/videos" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fontawesome": "assets/fontawesome" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/favicon.ico": "assets/favicon.ico" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    pathPrefix: "/",
  };
};

