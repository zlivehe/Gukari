const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: `dlxqwjiv6`,
    api_key: `497857977683336`,
    api_secret: `_wMbQV7GimlFp9WlLaRVVScwsUE`
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowedFormats: ['jpeg', 'png', 'jpg', 'avif', 'gif', 'webp']
    }
});

module.exports = {
    cloudinary,
    storage
}