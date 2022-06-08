import styled from "styled-components";
import { useMutateDeleteNote, useMutateEditNote } from "../../../gql/hooks/notes";
import Modal from "../../common/Modal";
import ModalButton from "../../common/ModalButton";
import NoteModal from "./NoteModal";
import { IMPORTANCE } from "../../../constants/tasks";

const Note = ({ note }) => {
  const [deleteNote] = useMutateDeleteNote(note?._id);
  const [updateNote] = useMutateEditNote(note?._id);

  function fakeCallback() {

  }

  function getImportanceText(value) {
    const { name } = IMPORTANCE.find(item => item.value === parseInt(value));
    return name;
  }

  function isLit(value) {
    return value === note.importance;
  }

  return (
    <NoteContainer>
      <div className="importance" title={`importance: ${getImportanceText(note.importance)}`}>
        <Importance isLit={isLit(1)} color="indigo"></Importance>
        <Importance isLit={isLit(2)} color="blue"></Importance>
        <Importance isLit={isLit(3)} color="dodgerblue"></Importance>
        <Importance isLit={isLit(4)} color="green"></Importance>
      </div>

      <h2>{note.title}</h2>
      <p>{note.text}<span></span></p>

      <div className="actions">
        <ModalButton
          modal={NoteModal}
          note={note}
          callback={updateNote}
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
          callback={deleteNote}
          text="Are you sure you want to delete this note?"
        >
          <i className="fas fa-trash" />
        </ModalButton>
      </div>
    </NoteContainer>
  )
};

export default Note;

const Importance = styled.p`
  background: ${props => props.isLit ? props.theme[props.color] : props.theme[props.color] + '22'};
  ${props => props.isLit
    ? `box-shadow: 1px -1px 1px #fff,
        -1px 1px 1px #fff,
        1px 1px 1px #fff,
        -1px -1px 1px #fff,
        0 0 2px ${props.theme[props.color]},
        0 0 4px ${props.theme[props.color]},
        0 0 6px ${props.theme[props.color]};`
    : ''}
  ${props => !props.isLit
    ? `border: 1px solid #00000044;`
    : ''}
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

const NoteContainer = styled.div`
  height: 200px;
  width: 300px;
  box-shadow: 4px 4px 6px ${props => props.theme.purple},
    6px 6px 9px ${props => props.theme.dodgerblue},
    8px 8px 12px ${props => props.theme.green},
    inset -3px -3px 6px #999;
  margin: 16px;
  position: relative;
  border-radius: 8px;
  padding: 14px;
  padding-bottom: 50px;
  background-color: white;

  > h2 {
    font-size: 1.1rem;
    font-weight: 500;
    padding-right: 20px;
    margin-bottom: 12px;
  }

  > p {
    text-overflow: ellipsis;
    overflow: hidden;
    height: 104px;
    position: relative;
    > span {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 50px;
      background: linear-gradient(to top, #fff 5%, #ffffff00);
    }
  }

  > .importance {
    position: absolute;
    bottom: 36px;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  > .actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 6px 4px 2px 4px;
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
      margin: 0px 6px 6px 6px;
      height: 22px;
      width: 22px;
      text-shadow: ${({ theme }) => (`
        0 0 1px ${theme.indigo},
        0 0 2px ${theme.indigo},
        0 0 3px ${theme.indigo},
        2px 3px 5px ${theme.indigo}
      `)};
      transition: color 0.2s ease-in-out, text-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
      &:hover {
        color: ${props => props.theme.purple};
        text-shadow: 4px 4px 6px #666;
        transform: translate(-1px, -1px);
      }
    }
  }
`;
