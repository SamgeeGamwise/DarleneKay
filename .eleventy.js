const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buffer).digest("hex").slice(0, 10);
}

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

  // Manifest will map original -> fingerprinted
  let manifest = {};

  // After build: fingerprint selected file types
  eleventyConfig.on("afterBuild", () => {
    const outputAssetsDir = path.join(__dirname, "_site/assets");
    const exts = [".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".woff2", ".ttf"];

    function walk(dir) {
      fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          walk(fullPath);
        } else {
          const ext = path.extname(fullPath).toLowerCase();
          if (exts.includes(ext)) {
            const hash = hashFile(fullPath);
            const newName = file.replace(ext, `.${hash}${ext}`);
            const newPath = path.join(dir, newName);

            // Copy to new file with hash in name
            fs.copyFileSync(fullPath, newPath);

            // Save mapping relative to /assets
            const relOriginal = path.relative(outputAssetsDir, fullPath).replace(/\\/g, "/");
            const relHashed = path.relative(outputAssetsDir, newPath).replace(/\\/g, "/");
            manifest[relOriginal] = relHashed;

            // Optional: remove original un-hashed file
            // fs.unlinkSync(fullPath);
          }
        }
      });
    }

    if (fs.existsSync(outputAssetsDir)) {
      walk(outputAssetsDir);
      fs.writeFileSync(path.join(outputAssetsDir, "manifest.json"), JSON.stringify(manifest, null, 2));
    }
  });

  // Nunjucks filter to resolve fingerprinted path
  eleventyConfig.addNunjucksFilter("fingerprint", function (inputPath) {
    return "/assets/" + (manifest[inputPath] || inputPath);
  });

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
