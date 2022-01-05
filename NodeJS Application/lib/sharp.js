const sharp = require("sharp");

function generateThumb(path, name) {
    sharp(path)
        .resize(60, 60, {
            fit: "contain",

            background: {
                r: 225,
                g: 227,
                b: 255,
                alpha: 0,
            },
        })

        .toFile("uploads/" + "thumbnail-" + name, (err, sharp) => {
            if (err) {
                throw new Error(err);
            }
        });
}
function generateSmalller(path, name, resolution) {
    sharp(path)
        .resize(resolution, resolution, {
            fit: "contain",

            background: {
                r: 225,
                g: 227,
                b: 255,
                alpha: 0,
            },
        })

        .toFile("uploads/" + "small-" + name, (err, sharp) => {
            if (err) {
                throw new Error(err);
            }
            // console.log(process.env.IMAGE_PREFIX + "uploads/" + "small-" + name);
        });
}

module.exports.generateThumb = generateThumb;
module.exports.generateSmalller = generateSmalller;
