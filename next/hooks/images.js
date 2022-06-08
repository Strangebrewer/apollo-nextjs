import { useMutateCreateImage } from "../gql/hooks/images";
import { generateSignature } from "./utils";

export const useCloudinaryWidget = () => {
  let widget;

  const [onImageUpload] = useMutateCreateImage();

  if (typeof window !== 'undefined') {
    const options = {
      cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
      uploadPreset: 'hall-of-mirrors',
      apiKey: process.env.NEXT_PUBLIC_CLOUD_KEY,
      uploadSignature: generateSignature
    };

    widget = window.cloudinary.createUploadWidget(options, onImageUpload);
  }

  const showWidget = () => {
    if (widget?.open) widget.open();
  };

  return { showWidget };
};
