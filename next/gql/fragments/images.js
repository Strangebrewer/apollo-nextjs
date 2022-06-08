import { gql } from "@apollo/client";

export const IMAGE_FRAGMENT = gql`
  fragment ImageFragment on Image {
    _id
    url
    lgUrl
    midUrl
    smUrl
    thumbnailUrl
    publicId
    data {
      height
      width
      originalFilename
    }
  }
`;
