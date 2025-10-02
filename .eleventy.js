const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Image = require("@11ty/eleventy-img");

// Simple file hasher
function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buffer).digest("hex").slice(0, 10);
}

module.exports = function (eleventyConfig) {
  // Responsive Images
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes) {
    // Ensure src resolves from your project’s source folder
    let imageSrc = path.join("src/", src);

    let metadata = await Image(imageSrc, {
      widths: [300, 600, 1200, null],
      formats: ["webp", "jpeg"],
      urlPath: "/assets/images/",
      outputDir: "_site/assets/images/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Watch source assets for live reload
  eleventyConfig.addWatchTarget("src/assets/styles");
  eleventyConfig.addWatchTarget("src/assets/js");

  // Build manifest before templates render
  let manifest = {};
  const assetsDir = path.join(__dirname, "src/assets");
  const outputAssetsDir = path.join(__dirname, "_site/assets");
  const exts = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".avif",
    ".svg",
    ".woff2",
    ".ttf",
    ".ico",
  ];

  function walk(srcDir, rel = "") {
    fs.readdirSync(srcDir).forEach((file) => {
      const full = path.join(srcDir, file);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        walk(full, path.join(rel, file));
      } else {
        const ext = path.extname(full).toLowerCase();
        if (exts.includes(ext)) {
          const hash = hashFile(full);
          const hashedName = file.replace(ext, `.${hash}${ext}`);
          const relOriginal = path.join(rel, file).replace(/\\/g, "/");
          const relHashed = path.join(rel, hashedName).replace(/\\/g, "/");

          // copy into _site so assets exist before browser requests
          const destDir = path.join(outputAssetsDir, rel);
          fs.mkdirSync(destDir, { recursive: true });
          fs.copyFileSync(full, path.join(destDir, hashedName));

          // map manifest
          manifest[`assets/${relOriginal}`] = `assets/${relHashed}`;
        }
      }
    });
  }

  if (fs.existsSync(assetsDir)) {
    walk(assetsDir);
    fs.writeFileSync(
      path.join(outputAssetsDir, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );
  }

  // Nunjucks filter to resolve fingerprinted path
  eleventyConfig.addNunjucksFilter("fingerprint", function (input) {
    // normalize path: strip leading slash if needed
    let normalized = input.replace(/^\/?assets\//, "assets/");
    return "/" + (manifest[normalized] || normalized);
  });

  // Static passthroughs (these still copy originals if you want them)
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/videos": "assets/videos" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fontawesome": "assets/fontawesome" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
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
