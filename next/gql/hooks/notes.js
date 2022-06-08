import { useMutationWithAuth, useQueryWithAuth } from "../../hooks/auth";
import { useNotePaginationState, useNoteQueryState } from "../../state/noteQuery";
import { CREATE_NOTE, GET_NOTES, DELETE_NOTE, UPDATE_NOTE } from "../queries/notes";

export const useQueryGetNotes = () => {
  const { notePagination } = useNotePaginationState();
  const { noteQuery } = useNoteQueryState();

  const { data, error, loading, refetch } = useQueryWithAuth(GET_NOTES, {
    variables: { params: { ...notePagination, ...noteQuery } }
  });

  return { data, loading, error, refetch };
};

export const useMutateCreateNote = () => {
  const [create, { loading, error }] = useMutationWithAuth(CREATE_NOTE);
  const { notePagination } = useNotePaginationState();
  const { noteQuery } = useNoteQueryState();

  function createNote(note) {
    create({
      variables: { note },
      update(cache, { data }) {
        const { notes } = cache.readQuery({
          query: GET_NOTES,
          variables: { params: { ...notePagination, ...noteQuery } }
        });

        if (data.createNote.importance === noteQuery.importance || !noteQuery.importance) {
          cache.writeQuery({
            query: GET_NOTES,
            variables: { params: { ...notePagination, ...noteQuery } },
            data: {
              notes: {
                info: { ...notes.info },
                result: [...notes.result, data.createNote]
              }
            }
          });
        }
      }
    })
  }

  return [createNote, { loading, error }];
};

export const useMutateEditNote = (id) => {
  const [edit, { loading, error }] = useMutationWithAuth(UPDATE_NOTE);

  function updateNote(note) {
    edit({ variables: { id, note } });
  }

  return [updateNote, { loading, error }];
};

export const useMutateDeleteNote = (id) => {
  const [remove, { loading, error }] = useMutationWithAuth(DELETE_NOTE);

  function deleteNote() {
    remove({
      variables: { id },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Note' });
        cache.evict({ id: normalizedId });
        cache.gc();
      }
    })
  }

  return [deleteNote, { error, loading }];
}