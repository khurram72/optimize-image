
//function to optimize images
const compress_images = require("compress-images");

const rename_files = require('./rename');
 
function optimizeImages()  {
  compress_images(
    "src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}",
    "build/img/",
    { compress_force: true, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "80"] } },
    { png: { engine: "webp", command: ['-q', '100'] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed) {
      if (completed === true) {
       // rename_files();
      }
    }
  );
}

// rename_files()
optimizeImages.call();

/***
 * 1. Image is taken from src/img
 * 2. Optimized image output is stored in build/img
 * 3. Rename takes images from build/img and output it to renamed/img
 */