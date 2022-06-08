import styled from "styled-components";
import { dueDayFormatter } from "../../../utils/dayUtils";
import { formatMoney } from "../../../utils/moneyUtils";
import Modal from "../../common/Modal";
import ModalButton from "../../common/ModalButton";
import BillModal from "./BillModal";

const BillCard = ({ bill, index }) => {
  const { name, amount, dueDay } = bill;
  const hasStripe = index === 1 || index % 2 !== 0;

  function formattedMoney(column) {
    const { transactions } = bill;
    const amount = (transactions && transactions[column]) ? transactions[column].amount : 0;
    return formatMoney(amount);
  }

  function quickPay() {

  }

  function pay() {

  }

  function edit() {

  }

  function remove() {

  }

  const payModalItems = [
    {
      label: 'Amount',
      type: 'text',
      value: (bill.amount / 100).toFixed(2)
    }, {
      label: 'Day',
      type: 'text',
      value: bill.dueDay
    }
  ];

  const sharedModalProps = {
    modal: Modal,
    cancelText: "Cancel",
    confirmText: "Submit",
  };

  return (
    <BillContainer hasStripe={hasStripe}>
      <div className="bill--meta">
        <p className="name">{name}</p>
        <p className="due-day">{dueDayFormatter(dueDay)}</p>
        <p className="amount">{formatMoney(amount)}</p>

        <div className="action-buttons">
          <button
            onClick={quickPay}
            disabled={bill.transactions.present}
            title={bill.transactions.present
              ? ''
              : bill.amount
                ? 'quick pay'
                : 'this will enter a transaction of $0.00'}
          >
            <i className="fas fa-check" />
          </button>

          <ModalButton
            callback={pay}
            title={bill.transactions.present ? '' : 'pay with changes'}
            disabled={bill.transactions.present}
            items={payModalItems}
            {...sharedModalProps}
          >
            <i className="fas fa-feather-alt" />
          </ModalButton>

          <ModalButton
            modal={BillModal}
            callback={edit}
            title="edit this recurring bill"
            bill={bill}
          >
            <i className="fas fa-edit" />
          </ModalButton>

          <ModalButton
            callback={remove}
            title="delete this recurring bill"
            text="Do you really want to delete this bill?"
            {...sharedModalProps}
          >
            <i className="fas fa-trash" />
          </ModalButton>
        </div>
      </div>

      <div className="bill--transactions">
        <p className="prev-month">{formattedMoney('pastTwo')}</p>
        <p className="this-month">{formattedMoney('pastOne')}</p>
        <p className="next-month">{formattedMoney('present')}</p>
      </div>
    </BillContainer>
  );
};

export default BillCard;

export const BillContainer = styled.div`
  background-color: ${props => props.hasStripe ? props.theme.green + '14' : '#00000000'};
  display: flex;
  padding: 6px 24px;

  > div {
    align-items: center;
  }

  > .bill--meta {
    width: 55%;
    display: flex;
    padding-right: 12px;

    > p {
      align-self: center;
    }

    > .name {
      width: 160px;
    }

    > .due-day {
      width: 60px;
      text-align: center;
    }

    > .amount {
      flex-grow: 1;
      text-align: right;
      padding-right: 4px;
    }

    > .action-buttons {
      width: 120px;
      text-align: right;

      > button {
        background: transparent;
        border: none;
        color: ${props => props.theme.purple};
        cursor: pointer;
        font-size: .8rem;
        padding: 0 2px 2px 2px;

        &:hover {
          color: ${props => props.theme.green};
        }

        &:disabled {
          color: grey;
          cursor: default;
        }
      }
    }
  }

  > .bill--transactions {
    width: 45%;
    justify-content: center;
    display: flex;

    > p {
      width: 25%;
      min-width: 100px;
      text-align: right;
      padding: 4px 8px;
    }
  }
`;