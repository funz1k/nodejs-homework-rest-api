const jimp = require('jimp');

const optimizedImage = async (imagePath) => {
    const image = await jimp.read(imagePath);
    await image.contain(250, 250);
    return await image.writeAsync(imagePath);
}

module.exports = optimizedImage;