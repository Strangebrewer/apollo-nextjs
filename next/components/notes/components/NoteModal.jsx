import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MainButton, Input } from '../../../styles/components';
import { Wrapper, Content, CloseBtn, Body, InputWrapper, Buttons } from '../../common/Modal';
import { IMPORTANCE } from '../../../constants/tasks';

const NoteModal = ({ show, close, note, callback }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [importance, setImportance] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text);
      setImportance(note.importance);
    }
  }, [note]);

  function onOutsideClick(e) {
    if (e.target.className.includes('note-modal-wrapper')) {
      close()
    }
  }

  function save() {
    const toSave = { title, text };
    if (importance) toSave.importance = parseInt(importance);
    callback(toSave);
    closeModal();
  }

  function closeModal() {
    reset();
    close();
  }

  function reset() {
    setTitle('');
    setText('');
    setImportance('');
  }

  return (
    <Wrapper
      className="note-modal-wrapper"
      onMouseDown={onOutsideClick}
      show={show}
    >
      <Content show={show}>
        <CloseBtn onClick={close}>&times;</CloseBtn>
        <Body hasHeading={true}>
          <h2>{!!note ? 'Edit' : 'New'} Note</h2>
          <InputWrapper>
            <label>Title</label>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <label>Importance</label>
            <Input
              as="select"
              name="importance"
              value={importance}
              onChange={e => setImportance(e.target.value)}
            >
              <option value=""></option>
              {IMPORTANCE.map(t => <option value={t.value} key={t.name}>{t.name}</option>)}
            </Input>
          </InputWrapper>

          <InputWrapper>
            <label>Text</label>
            <Input
              as="textarea"
              type="text"
              name="text"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={4}
            />
          </InputWrapper>

          <Buttons>
            <MainButton
              onClick={save}
              color="dodgerblue"
              bg="white"
              disabled={!title || !text}
            >
              Save
            </MainButton>

            <MainButton
              onClick={closeModal}
              color="candy"
              bg="white"
            >
              Cancel
            </MainButton>
          </Buttons>
        </Body>
      </Content>
    </Wrapper>
  )
};

export default NoteModal;
