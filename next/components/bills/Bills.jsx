import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQueryBills } from "../../gql/hooks/bills";
import { useMoneyDateState } from "../../state/moneyDate";
import BillCard, { BillContainer } from "./components/BillCard";
import BillsToolbar from "./components/BillsToolbar";
import { MONTHS } from "../../constants/months";

const Bills = () => {
  const { data, loading, error } = useQueryBills();
  if (error) console.log('error:::', error);

  const [monthsToDisplay, setMonthsToDisplay] = useState([]);
  const { moneyDate } = useMoneyDateState();

  useEffect(() => {
    const months = [];
    if (moneyDate.month === 0) {
      months.push(MONTHS[10]);
      months.push(MONTHS[11]);
      months.push(MONTHS[0]);
    } else if (moneyDate.month === 1) {
      months.push(MONTHS[11]);
      months.push(MONTHS[0]);
      months.push(MONTHS[1]);
    } else {
      months.push(MONTHS[moneyDate.month - 2]);
      months.push(MONTHS[moneyDate.month - 1]);
      months.push(MONTHS[moneyDate.month]);
    }
    setMonthsToDisplay(months);
  }, [moneyDate.month]);

  return (
    <Main>
      <BillsToolbar title="Bills and Stuff" />

      <div className="main-wrapper">
        <div className="bills-meta">
          <h2>Summary</h2>
          <p>(Fill this in later...)</p>
        </div>

        <div className="bills-container">
          <BillHeader>
            <div className="bill--meta bill--meta__header">
              <p className="name">Name</p>
              <p className="due-day">Due</p>
              <p className="amount">Amount</p>

              <div className="action-buttons">
                <p>Actions</p>
              </div>
            </div>

            <div className="bill--transactions bill--transactions__header">
              <p className="next-month">{monthsToDisplay[0]}</p>
              <p className="prev-month">{monthsToDisplay[1]}</p>
              <p className="this-month">{monthsToDisplay[2]}</p>
            </div>
          </BillHeader>

          <div className="bills--body">
            {!loading
              ? (
                data?.bills?.map((bill, i) => {
                  return <BillCard key={bill._id} bill={bill} index={i} />
                })
              ) : null}
          </div>
        </div>
      </div>
    </Main>
  )
};

export default Bills;

const BillHeader = styled(BillContainer)`
  /* background-color: ${props => props.theme.bg}; */
  > .bill--meta__header,
  > .bill--transactions__header {
    font-weight: 500;
    font-size: 1.2rem;
  }

  > .bill--meta__header {

    > .amount {
      padding-right: 0;
    }

    > .action-buttons {
      border: none;

      > p {
        text-align: right;
      }
    }
  }

  > .bill--transactions__header {
    color: ${props => props.theme.blue};
    margin-right: 17px;
  }
`;

const Main = styled.main`
  /* background-image: url('/017-Subtle-light-patterns-Vol04.png'); */
  position: relative;
  padding: 0 32px;
    
  > .date-block {
    width: 100%;
    margin: 0 auto;
  }

  > .main-wrapper {
    display: flex;
    justify-content: space-around;
    max-width: 1500px;
    margin: 0 auto;

    > .bills-meta {
      background-color: white;
      width: 260px;
      padding: 24px;
      border-radius: 12px;
      border: 1px solid #b6b6b6;
      box-shadow: 6px 6px 12px ${props => props.theme.indigo},
        8px 8px 16px ${props => props.theme.dodgerblue},
        10px 10px 20px ${props => props.theme.darkgreen},
        inset -3px -3px 6px #999;
      height: 260px;

      > h2 {
        font-size: 1.2rem;
        font-weight: 500;
        text-align: center;
        margin-bottom: 12px;
      }
    }

    > .bills-container {
      background-color: white;
      flex-grow: 1;
      max-width: 1000px;
      border: 1px solid grey;
      padding: 24px 36px 48px 48px;
      border-radius: 12px;
      border: 1px solid #b6b6b6;
      box-shadow: 6px 6px 12px ${props => props.theme.indigo},
        8px 8px 16px ${props => props.theme.dodgerblue},
        10px 10px 20px ${props => props.theme.darkgreen},
        inset -3px -3px 6px #999;
      height: 680px;

      > .bills--body {
        overflow-y: auto;
        box-shadow: inset 4px 4px 8px #00000077;
        height: 556px;
        padding: 12px 0;
        background-color: #00000011;
      }
    }
  }
`;
