import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query GetNotes($params: NoteQueryParams) {
    notes(params: $params) {
      result {
        _id
        title
        text
        importance
        favorite
      }
      info {
        count
        pages
        prev
        next
      }
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteCreateInput!) {
    createNote(note: $note) {
      _id
      title
      text
      importance
      favorite
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: ID!, $note: NoteUpdateInput!) {
    updateNote(id: $id, note: $note) {
      _id
      title
      text
      importance
      favorite
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      _id
      title
      text
      importance
      favorite
    }
  }
`;
