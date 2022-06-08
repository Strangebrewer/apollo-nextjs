import { useEffect, useState } from 'react';
import styled from "styled-components";
import { useQueryGetNotes } from "../../gql/hooks/notes";
import Note from "./components/Note";
import { useNotePaginationState, useNoteQueryState } from '../../state/noteQuery';
import NotesToolbar from './components/NotesToolbar';

const Notes = () => {
  const [importance, setImportance] = useState('');
  const [pageSize, setPageSize] = useState(20);

  const { data, error, loading } = useQueryGetNotes();
  const { setNotePagination } = useNotePaginationState();
  const { setNoteQuery } = useNoteQueryState();

  useEffect(() => {
    if (data?.notes?.info) {
      const params = { pageSize };
      const { count, prev, next, pages } = data?.notes?.info;

      if (pageSize >= count) {
        params.page = 1;
      }

      // if you're on the third page of 5 and there's 20 total
      //  and you pick pageSize 25, it should reset to the first page:

      // TODO:
      // If you have it set to pageSize two, and you change it to pageSize of 5,
      //  it should calculate where in that pagination the new pageSize should land

      setNotePagination(params);
    }
  }, [pageSize]);

  useEffect(() => {
    const params = { importance: null };
    if (importance) params.importance = parseInt(importance);
    setNoteQuery(params);
  }, [importance]);

  return (
    <Main>
      {data?.notes?.info ? <NotesToolbar title="Notes and Stuff" info={data.notes.info} /> : null}

      <div className="notes-container">
        {loading
          ? <h2>Loading...</h2>
          : data?.notes?.result?.map(note => {
            return (
              <Note key={note._id} note={note} />
            )
          })
        }
      </div>
    </Main >
  )
};

export default Notes;

const Main = styled.main`
  background-color: ${props => props.theme.bg};
  position: relative;
  margin: 0 32px;
    
  > h1 {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    padding-bottom:12px;
  }

  > .notes-container {
    display: flex;
    flex-wrap: wrap;
  }
`;
