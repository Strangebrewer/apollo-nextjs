import styled from 'styled-components';

export const MainButton = styled.button`
  background: ${props => props.bg ? props.theme[props.bg] : '#111'};
  border: 1px solid ${props => props.theme[props.color]};
  border-radius: 5px;
  box-shadow: 4px 4px 4px ${props => props.theme[props.color]}77;
  color: ${props => props.theme[props.color]};
  cursor: pointer;
  font-weight: bold;
  margin-right: 16px;
  min-width: 80px;
  outline: transparent;
  padding: 6px 12px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme[props.color]};
    color: ${props => props.isLight ? '#222' : '#fff'};
  }

  &:disabled {
    background-color: ${props => props.theme.text + '44'};
    border: 1px solid ${props => props.theme.text + '99'};
    box-shadow: none;
    color: ${props => props.theme.bg + '99'};
  }
`;

export const Label = styled.label`
  display: inline-block;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 8px 2px;
  width: 100%;
  color: ${props => props.theme.black};
  /* text shadow makes it easier to read on a busy background */
  text-shadow: 0 0 1px white, 0 0 2px white, 0 0 3px white, 0 0 4px white, 0 0 5px white;
`;

export const Input = styled.input`
  background-color: #e3eaff;
  border: none;
  border-radius: 4px;
  box-shadow: inset 3px 3px 2px #aaa,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.indigo};
  font-weight: 500;
  outline: transparent;
  padding: 6px 10px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;
