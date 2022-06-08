import axios from "axios";
import { useMutationWithAuth, useQueryWithAuth } from "../../hooks/auth";
import { CREATE_IMAGE, DELETE_IMAGE, GET_IMAGES } from "../queries/images";

export const useQueryGetImages = () => {
  const { data, error, loading, refetch } = useQueryWithAuth(GET_IMAGES);
  return { data, loading, error, refetch };
}

export const useMutateCreateImage = () => {
  const [create, { loading, error }] = useMutationWithAuth(CREATE_IMAGE);

  function onImageUpload(error, result) {
    if (error) console.log('error in useCloudinaryWidget:::', error);

    if (result?.event === 'success') {
      const { info } = result;
      const image = {
        url: info.url,
        lgUrl: info.eager[0].url,
        midUrl: info.eager[1].url,
        smUrl: info.eager[2].url,
        thumbnailUrl: info.thumbnail_url,
        publicId: info.public_id,
        data: {
          assetId: info.asset_id,
          etag: info.etag,
          originalFilename: info.original_filename,
          path: info.path,
          secureUrl: info.secure_url,
          height: info.height,
          width: info.width
        }
      };

      create({
        variables: { image },
        update(cache, { data }) {
          const { images } = cache.readQuery({
            query: GET_IMAGES
          });

          cache.writeQuery({
            query: GET_IMAGES,
            data: { images: [...images, data.createImage] }
          });
        }
      });
    }
  }

  return [onImageUpload, { loading, error }];
};

export const useMutateDeleteImage = (id, publicId) => {
  const [remove, { error, loading }] = useMutationWithAuth(DELETE_IMAGE);

  async function deleteImage() {
    const { data } = await axios({
      url: '/api/cloudinary/remove',
      method: 'post',
      data: { publicId }
    });

    if (data?.result === 'ok' || data?.result === 'not found') {
      remove({
        variables: { id },
        update(cache) {
          const normalizedId = cache.identify({ id, __typename: 'Image' });
          cache.evict({ id: normalizedId });
          cache.gc();
        }
      });
    }
  }

  return [deleteImage, { error, loading }];
};
