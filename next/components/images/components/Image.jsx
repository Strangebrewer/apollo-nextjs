import styled from "styled-components";
import { useMutateDeleteImage } from "../../../gql/hooks/images";
import ModalButton from "../../common/ModalButton";
import Modal from "../../common/Modal";

const Image = ({ image }) => {
  const [deleteImage] = useMutateDeleteImage(image._id, image.publicId);

  function fakeCallback() {

  }

  return (
    <ImageContainer>
      <img src={image.url} alt={image.data.originalFilename} />
      <div className="actions">
        <ModalButton
          modal={Modal}
          callback={fakeCallback}
          text="Hi, sucka!"
        >
          <i className="fas fa-edit" />
        </ModalButton>
        
        <ModalButton
          modal={Modal}
          callback={fakeCallback}
          text="Hi again, sucka!"
        >
          <i className="fas fa-save" />
        </ModalButton>

        <button className="save-btn">
          <i className="fas fa-save" />
        </button>

        <ModalButton
          modal={Modal}
          callback={deleteImage}
          text="Are you sure you want to delete this image?"
        >
          <i className="fas fa-trash" />
        </ModalButton>
      </div>
    </ImageContainer>
  )
};

export default Image;

export const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  background-color: black;
  margin: 12px;
  position: relative;

  > img {
    max-width: 200px;
    max-height: 200px;
    margin: auto;
  }

  > .actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 6px 4px 2px 4px;
    background: linear-gradient(to top, #000000, #00000000);
    opacity: .3;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 1;
    }

    > button {
      background: transparent;
      outline: transparent;
      border: none;
      cursor: pointer;
      color: ${props => props.theme.white};
      font-size: 1rem;
      padding: 0;
      height: 22px;
      width: 22px;
      text-shadow: ${({ theme }) => (`
        0 0 1px ${theme.indigo},
        0 0 2px ${theme.indigo},
        0 0 3px ${theme.indigo},
        3px 3px 6px ${theme.indigo}
      `)};
    }
  }
`;