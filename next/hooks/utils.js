import axios from "axios";

export const generateSignature = async (cb, paramsToSign) => {
  try {
    const signature = await axios.post('/api/cloudinary/signature', { paramsToSign });
    cb(signature.data);
  } catch (err) {
    console.log('err in generateSignature:::', err);
  }
};
