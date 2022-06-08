import styled from "styled-components";
import { useNotePaginationState } from '../../state/noteQuery';

const Paginator = ({ info }) => {
  const { prev, next } = info;
  const { setNotePagination } = useNotePaginationState();

  function changePage(page) {
    setNotePagination({ page });
  }

  return (
    <div>
      <button onClick={e => changePage(prev)} disabled={!prev}>prev</button>
      <button>{next ? next - 1 : prev ? prev + 1 : ''}</button>
      <button onClick={e => changePage(next)} disabled={!next}>next</button>
    </div>
  );
};

export default Paginator;
