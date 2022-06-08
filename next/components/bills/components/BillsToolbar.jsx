import styled from 'styled-components';
import { useMutationCreateBill } from '../../../gql/hooks/bills';
import DateBlock from '../../common/DateBlock';
import ModalButton from '../../common/ModalButton';
import { Toolbar } from '../../notes/components/NotesToolbar';
import BillModal from './BillModal';

const BillsToolbar = (props) => {
  const [createBill] = useMutationCreateBill();

  function createNewBill(bill) {
    console.log('bill:::', bill);
    createBill(bill);
  }

  return (
    <ToolbarContainer>
      <div className="title">
        <h2>{props.title}</h2>

        <ModalButton
          modal={BillModal}
          callback={createNewBill}
        >
          <i className='fas fa-plus' />
        </ModalButton>
      </div>

      <DateBlock />

      <div className="tools">
        {/* more filtering or searching will go here... */}
      </div>
    </ToolbarContainer>
  );
};

export default BillsToolbar;

const ToolbarContainer = styled(Toolbar)`
  box-shadow: 6px 6px 12px ${props => props.theme.indigo},
    8px 8px 16px ${props => props.theme.dodgerblue},
    10px 10px 20px ${props => props.theme.darkgreen},
    inset -3px -3px 6px #999;

  > .title,
  > .tools,
  > .date-block {
    width: 30%;
  }

  > .date-block {
    margin: auto;
  }

  > .title {
    justify-content: left;
  }

  > .tools {
    justify-content: right;
  }
`;