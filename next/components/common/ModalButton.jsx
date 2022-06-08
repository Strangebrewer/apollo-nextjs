import { useState } from "react";
import { MainButton } from '../../styles/components';

const ModalButton = ({
  modal: Modal,
  text,
  title,
  children,
  disabled,
  mainButton,
  bg,
  isLight,
  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal(bool) {
    setShowModal(bool);
  }

  return (
    <>
      <Modal
        show={showModal}
        close={() => toggleModal(false)}
        {...rest}
      >
        {text}
      </Modal>

      {mainButton
        ? (
          <MainButton
            onClick={() => toggleModal(true)}
            title={title}
            disabled={disabled}
            color={mainButton}
            isLight={isLight}
            bg={bg}
          >
            {children}
          </MainButton>
        ) : (
          <button
            onClick={() => toggleModal(true)}
            title={title}
            disabled={disabled}
          >
            {children}
          </button>
        )
      }
    </>
  )
};

export default ModalButton;
