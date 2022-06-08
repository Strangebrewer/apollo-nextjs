import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MainButton, Input, Label } from '../../styles/components';

const Modal = props => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (function () {
      setInitialState();
    })();
  }, [props.items]);

  function setInitialState() {
    const newState = {};
    if (props.items) {
      for (let i = 0; i < props.items.length; i++) {
        const el = props.items[i];
        newState[el.label.toLowerCase()] = el.value || '';
      }
    }
    setState(newState);
    setLoading(false);
  }

  function onOutsideClick(e) {
    if (e.target.className.includes('modal-wrapper')) {
      props.close()
    }
  }

  function callback() {
    props.callback(state);
    closeModal();
  }

  function callbackTwo() {
    props.callbackTwo(state);
    closeModal();
  }

  function closeModal() {
    setInitialState();
    props.close();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  // isMoneyPage accounts for the effect the CSSTransition setup has on where
  //  the modal appears - without this, it only fills the component
  //  rather than the whole viewheight
  return (
    <Wrapper
      className="modal-wrapper"
      onMouseDown={onOutsideClick}
      show={props.show}
    >
      <Content show={props.show}>
        <CloseBtn onClick={props.close}>&times;</CloseBtn>
        <Body hasHeading={!!props.heading}>
          {/* <h2>{props.heading ? props.heading : ''}</h2> */}
          {props.items && !loading && props.items.map((item, i) => {
            const itemValue = state[item.label.toLowerCase()];
            // if (itemValue === '' || (itemValue && itemValue.length)) {
            return (
              <InputWrapper key={i}>
                <Label>{item.label}</Label>
                {item.type === 'textarea' && (
                  <Input
                    as="textarea"
                    type="text"
                    name={item.label.toLowerCase()}
                    onChange={handleInputChange}
                    value={itemValue}
                  />
                )}
                {item.type === 'text' && (
                  <Input
                    type="text"
                    name={item.label.toLowerCase()}
                    onChange={handleInputChange}
                    value={itemValue}
                    full
                  />
                )}
              </InputWrapper>
            )
            // }
          })}
          <ChildrenWrapper hasChildren={!!props.children}>
            {props.children}
          </ChildrenWrapper>
          <Buttons>
            {props.callback && (
              <MainButton
                onClick={callback}
                color="dodgerblue"
                bg="white"
              >
                {props.confirmText || 'OK'}
              </MainButton>
            )}
            {props.showCallbackTwo && (
              <MainButton
                onClick={callbackTwo}
                color="green"
                bg="white"
              >
                {props.confirmTwoText || 'OK'}
              </MainButton>
            )}
            {props.close && props.callback && (
              <MainButton
                onClick={closeModal}
                color="candy"
                bg="white"
              >
                {props.cancelText || 'Close'}
              </MainButton>
            )}
          </Buttons>
        </Body>
      </Content>
    </Wrapper>
  )
}

export default Modal;

export const Wrapper = styled.div`
  background-color: rgba(0,0,0,0.7);
  cursor: default;
  display: ${props => props.show ? 'flex' : 'none'};
  min-height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99999;
`;

const ChildrenWrapper = styled.div`
  display: ${props => props.hasChildren ? 'block' : 'none'};
  line-height: 2;
  margin-bottom: ${props => props.hasChildren ? '12px' : '0px'};
  text-align: center;
`;

export const Content = styled.div`
  animation-duration: 0.4s;
  animation-name: fadein;
  background: ${props => props.theme.bg2};
  /* background-color: white; */
  border: 1px solid ${props => props.theme.indigo};
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px ${props => props.theme.indigo},
    0 0 6px ${props => props.theme.indigo},
    0 0 10px ${props => props.theme.dodgerblue},
    0 0 14px ${props => props.theme.dodgerblue},
    0 0 18px ${props => props.theme.darkgreen},
    0 0 26px ${props => props.theme.darkgreen},
    0 0 40px #aaa;
  display: ${props => props.show ? 'block' : 'none'};
  font-size: 1.2rem;
  font-weight: 400;
  margin: auto;
  max-width: 60%;
  min-width: 300px;
  padding: 0;
  position: relative;
  text-shadow: 0 0 1px white, 0 0 2px white, 0 0 3px white, 0 0 4px white, 0 0 5px white;
  
  img {
    border: 1px solid black;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Body = styled.div`
  color: ${props => props.theme.black};
  margin: auto;
  max-width: 100%;
  padding: 40px;
  text-align: left;
  z-index: 999999;

  > h2 {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    max-width: 340px;
    text-align: center;
    ${props => props.hasHeading ? 'margin-bottom: 18px;' : null}
  }
`;

export const InputWrapper = styled.div`
  margin: auto;
  min-width: 240px;
  max-width: 240px;

  > label {
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    width: 100%;
  }
  
  > input, > select, > textarea {
    margin-bottom: 20px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const Buttons = styled.div`
  text-align: center;
  width: 100%;
  > button:last-of-type {
    margin-right: 0;
  }
  > button {
    &:disabled {
      cursor: default;
    }
    ${props => props.color === 'green' ? 'background-color: #84ec84 !important;' : ''}
  }
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  color: lightgrey;
  font-size: 20px;
  outline: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  
  &:hover, &:focus {
    color: ${props => props.theme.black};
    cursor: pointer;
    text-decoration: none;
  }
`;
