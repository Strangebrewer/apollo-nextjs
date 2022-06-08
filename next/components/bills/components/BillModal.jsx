import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQueryAccounts } from '../../../gql/hooks/accounts';
import { useQueryCategories } from '../../../gql/hooks/categories';

import { MainButton, Input, Label } from '../../../styles/components';
import { Wrapper, Content, Body, Buttons, CloseBtn } from '../../common/Modal';

const BillModal = props => {
  const { show, bill } = props;

  const [state, setState] = useState({
    amount: '0.00',
    description: '',
    name: '',
    dueDay: '1',
    source: '',
    destination: '',
    category: '',
  });

  const { data: accData, loading } = useQueryAccounts();
  const { data: catData, loading: catLoading } = useQueryCategories();

  useEffect(() => {
    if (bill) {
      let source = bill.source || '';
      let destination = bill.destination || '';
      let category = bill.category || '';
      
      if (source && source._id) source = source._id;
      if (destination && destination._id) destination = destination._id;
      if (category && category._id) category = category._id;

      setState({
        _id: bill._id,
        amount: (bill.amount / 100).toFixed(2),
        description: bill.description,
        name: bill.name,
        dueDay: bill.dueDay,
        source: source,
        destination: destination,
        category: category,
      });
    }
  }, []);

  function onOutsideClick({ target }) {
    if (target.className.includes('bill-modal-wrapper')) {
      closeModal();
    }
  }

  function callback() {
    props.callback(state);
    closeModal();
  }

  function closeModal() {
    props.close();
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  function isDisabled() {
    const { amount, name, dueDay, source } = state;
    if (!amount || !name || !dueDay || !source) return true;
    return false;
  }

  return (
    <Wrapper
      className='bill-modal-wrapper'
      onMouseDown={onOutsideClick}
      show={show}
    >
      <Content show={show}>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        <Body>
          <FormWrapper>
            <div>
              <Label>name</Label>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>amount</Label>
              <Input
                type="text"
                name="amount"
                value={state.amount}
                onChange={handleInputChange}
                full
              />
            </div>

            {accData?.accounts
              ? (
                <div>
                  <Label>source</Label>
                  <Input
                    as="select"
                    name="source"
                    value={state.source}
                    onChange={handleInputChange}
                    full
                  >
                    <option value=""></option>
                    {accData.accounts.map((acc, i) => (
                      <option key={`account-${acc._id}`} value={acc._id}>{acc.name}</option>
                    ))}
                  </Input>
                </div>
              ) : null}

            {accData?.accounts
              ? (
                <div>
                  <Label>destination</Label>
                  <Input
                    as="select"
                    name="destination"
                    value={state.destination}
                    onChange={handleInputChange}
                    full
                  >
                    <option value=""></option>
                    {accData.accounts.map((acc, i) => (
                      <option key={`account-${acc._id}`} value={acc._id}>{acc.name}</option>
                    ))}
                  </Input>
                </div>
              ) : null}

            {catData?.categories
              ? (
                <div>
                  <Label>category</Label>
                  <Input
                    as="select"
                    name="category"
                    value={state.category}
                    onChange={handleInputChange}
                    full
                  >
                    <option value=""></option>
                    {catData.categories.map((cat, i) => (
                      <option key={`category-${cat._id}`} value={cat._id}>{cat.name}</option>
                    ))}
                  </Input>
                </div>
              ) : null}


            <div>
              <Label>due day</Label>
              <Input
                type="text"
                name="dueDay"
                value={state.dueDay}
                onChange={handleInputChange}
                full
              />
            </div>

            <div className='full-width'>
              <Label>description</Label>
              <Input
                type="text"
                name="description"
                value={state.description}
                onChange={handleInputChange}
                full
              />
            </div>
          </FormWrapper>

          <Buttons>
            <MainButton
              onClick={callback}
              color="dodgerblue"
              bg="white"
              disabled={isDisabled()}
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
  );
};

export default BillModal;

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-bottom: 16px;

  > div {
    width: 50%;
    padding: 0 20px;
  }

  > .full-width {
    width: 100%;
  }
`;
