import cloudinary from 'cloudinary';
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

export default async function cloudinaryHandler(req, res) {
  try {
    switch (req.query.action) {
      case 'signature':
        const signature = cloudinary.v2.utils.api_sign_request(req.body.paramsToSign, process.env.CLOUD_SECRET);
        res.send(signature);
        break;
      case 'remove':
        const result = await cloudinary.v2.uploader.destroy(req.body.publicId, { invalidate: true });
        res.send(result);
        break;
      default:
        res.send('These are not the droids you\'re looking for.');
    }
  } catch (err) {
    console.log('err in cloudinaryHandler:::', err);
  }
}
