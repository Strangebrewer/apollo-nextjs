import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useMutateCreateNote } from '../../../gql/hooks/notes';
import { Input } from '../../../styles/components';
import ModalButton from '../../common/ModalButton';
import NoteModal from './NoteModal';
import { IMPORTANCE } from '../../../constants/tasks';
import { useNotePaginationState, useNoteQueryState } from '../../../state/noteQuery';
import Paginator from '../../common/Paginator';

const NotesToolbar = ({ info, title }) => {
  const [importance, setImportance] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [createNote] = useMutateCreateNote();
  const { notePagination, setNotePagination } = useNotePaginationState();
  const { setNoteQuery } = useNoteQueryState();

  // Both of these useEffects are reloading the page... fix that...
  useEffect(() => {
    if (info) {
      const params = calculateParams();
      setNotePagination(params);
    }
  }, [pageSize]);

  useEffect(() => {
    const params = { importance: null };
    if (importance) params.importance = parseInt(importance);
    setNoteQuery(params);
  }, [importance]);

  function calculateParams() {
    const params = { pageSize };
    const { count, prev, next, pages } = info;

    if (pageSize >= count) {
      params.page = 1;
    }

    // if you're on the third page of 5 and there's 20 total
    //  and you pick pageSize 25, it should reset to the first page:

    // TODO:
    // If you have it set to pageSize two, and you change it to pageSize of 5,
    //  it should calculate where in that pagination the new pageSize should land

    return params;
  }

  return (
    <Toolbar>
      <div className="title">
        <h2>{title}</h2>

        <ModalButton
          modal={NoteModal}
          callback={createNote}
        >
          <i className='fas fa-plus' />
        </ModalButton>
      </div>

      <div className="tools">
        <div className="filter">
          <p>filter by importance:</p>
          <Input
            as="select"
            name="importance"
            value={importance}
            onChange={e => setImportance(e.target.value)}
          >
            <option value="">all</option>
            {IMPORTANCE.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
          </Input>
        </div>

        {info ? <Paginator info={info} /> : null}

        <div className='per-page'>
          <p>per page</p>
          <Input
            as="select"
            name="pageSize"
            value={pageSize}
            onChange={e => setPageSize(parseInt(e.target.value))}
          >
            {[2, 3, 5, 10, 15, 20, 25, 50, 100].map(n => {
              return <option key={`per-page-${n}`} value={n}>{n}</option>
            })}
          </Input>
        </div>
      </div>
    </Toolbar>
  );
};

export default NotesToolbar;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  background: white;
  border: 1px solid #bbb;
  margin: 12px 0 36px 0;
  box-shadow: 4px 4px 8px #aaa;
  box-shadow: 6px 6px 12px ${props => props.theme.purple},
    8px 8px 16px ${props => props.theme.dodgerblue},
    10px 10px 20px ${props => props.theme.green},
    inset -3px -3px 6px #999;
  margin-bottom: 36px;
  border-radius: 8px;
  padding: 0 16px;

  > .title {
    display: flex;
    justify-content: space-around;
    align-items: center;

    > h2 {
      font-size: 1.8rem;
      font-weight: 500;
      margin-right: 48px;
    }
    
    > button {
      display: inline;
      background: white;
      color: ${props => props.theme.green};
      border: none;
      border: 1px solid ${props => props.theme.green + '33'};
      outline: transparent;
      border-radius: 50%;
      height: 32px;
      width: 32px;
      font-weight: 700;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      box-shadow: 4px 4px 8px  ${props => props.theme.text};
      
      &:hover {
        background-color: ${props => props.theme.indigo};
        box-shadow: 4px 4px 8px  ${props => props.theme.indigo}aa;
        color: #fff;
      }
      
      &:active {
        transform: translate(1px, 1px);
        box-shadow: 2px 2px 4px  ${props => props.theme.indigo};
      }
    }
  }

  > .tools {
    align-items: center;
    display: flex;
    gap: 32px;
    justify-content: space-between;
    
    > .filter,
    > .per-page {
      display: flex;
      align-items: center;
      
      > p {
        padding: 8px 10px 8px 12px;
      }
      
      > select {
        border: none;
        border: 1px solid lightgrey;
        box-shadow: none;
        border-radius: 5px;
        background-color: transparent;
        height: unset;
        padding: 4px 8px;
        padding-right: 0;
        color: ${props => props.theme.indigo};
        font-weight: 700;
      }
    }
    
    > .per-page {
      /* box-shadow: inset 5px -5px 10px grey;
      border-radius: 20px; */
    }
  }
`;
