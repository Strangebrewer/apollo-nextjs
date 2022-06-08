import { useEffect, useState } from 'react';
import { getDaysInMonth } from "date-fns";
import { useMoneyDateState } from '../../state/moneyDate';
import styled from 'styled-components';
import { Input } from '../../styles/components';
import { MONTHS } from '../../constants/months';

const DateBlock = (props) => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [daysArray, setDaysArray] = useState([]);
  const [yearsArray, setYearsArray] = useState([]);
  const { moneyDate, setMoneyDate } = useMoneyDateState();

  useEffect(() => {
    (async function () {
      const dateObject = moneyDate;
      setDay(dateObject.day);
      setMonth(dateObject.month);
      setYear(dateObject.year);

      let current = 1990;
      const years = [];
      while (current <= dateObject.year + 5) {
        years.push(current);
        current++;
      }
      setYearsArray(years);

      if (props.includeDay) {
        setDaysInMonth(dateObject.year, dateObject.month);
      }
    })();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);

    switch (name) {
      case "day":
        setDay(parsedValue);
        break;
      case "month":
        setMonth(parsedValue);
        setDaysInMonth(year, parsedValue);
        break;
      default:
        setYear(parsedValue);
        setDaysInMonth(parsedValue, month);
    }
  }

  function setDaysInMonth(year, month) {
    const numberOfDays = getDaysInMonth(new Date(year, month));
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(i);
    }
    if (day > numberOfDays) setDay(numberOfDays);
    setDaysArray(days);
  }

  async function submit() {
    const dateObject = { month, year };
    if (props.includeDay) dateObject.day = day;
    setMoneyDate(dateObject);
  }

  return (
    <Wrapper className='date-block'>
      <Input
        as="select"
        name="month"
        value={month}
        onChange={handleInputChange}
      >
        {MONTHS.map((m, i) => (
          <option value={i} key={`month-${i}`}>{m}</option>
        ))}
      </Input>

      {props.includeDay && daysArray.length
        ? (
          <Input
            as="select"
            name="day"
            value={day}
            onChange={handleInputChange}
          >
            {daysArray.map((d, i) => (
              <option value={d} key={`day-${i}`}>{d}</option>
            ))}
          </Input>
        ) : null}

      {yearsArray.length
        ? (
          <Input
            as="select"
            name="year"
            value={year}
            onChange={handleInputChange}
          >
            {yearsArray.map((y, i) => (
              <option value={y} key={`year-${i}`}>{y}</option>
            ))}
          </Input>
        ) : null}

        <button onClick={submit}>Go</button>
    </Wrapper>
  );
};

export default DateBlock;

const Wrapper = styled.div`
  text-align: center;

  > select {
    border-radius: 0;
  }

  > select:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  > select:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
