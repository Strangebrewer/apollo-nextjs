import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../fragments/images";

export const GET_IMAGES = gql`
  query GetImages {
    images {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const CREATE_IMAGE = gql`
  mutation CreateImage($image: ImageCreateInput) {
    createImage(image: $image) {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    deleteImage(id: $id) {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
`;
