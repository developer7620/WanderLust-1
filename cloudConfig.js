const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY_API,
    api_secret:process.env.CLOUD_SECRET_API
});

 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'WanderLust_DEV',
      allowedFormat: ["png", "jpg","jpeg"],
    },
  });

  module.exports = {
    cloudinary,
    storage
  }