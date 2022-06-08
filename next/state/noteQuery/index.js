import { atom, useRecoilState } from 'recoil';

export const NOTE_QUERY_STATE = 'noteQueryState';
export const NOTE_PAGINATION_STATE = 'notePaginationState';

const initialQueryState = atom({
  key: NOTE_QUERY_STATE,
  default: {}
});

export const useNoteQueryState = () => {
  const [noteQuery, setState] = useRecoilState(initialQueryState);

  function setNoteQuery(queryObject) {
    const { importance } = queryObject;
    if (importance === null) {
      queryObject = {};
    }
    setState(queryObject);
  }

  return { noteQuery, setNoteQuery };
}


const initialPaginationState = atom({
  key: NOTE_PAGINATION_STATE,
  default: { page: 1, pageSize: 20 }
});

export const useNotePaginationState = () => {
  const [notePagination, setState] = useRecoilState(initialPaginationState);

  function setNotePagination(paginationObject) {
    const { page, pageSize } = paginationObject;
    if (page && typeof page === 'string') paginationObject.page = parseInt(page);
    if (pageSize && typeof pageSize === 'string') paginationObject.pageSize = parseInt(pageSize);
    if (!page) paginationObject.page = notePagination.page;
    if (!pageSize) paginationObject.pageSize = notePagination.pageSize;
    setState(paginationObject);
  }

  return { notePagination, setNotePagination };
}