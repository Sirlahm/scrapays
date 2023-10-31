import { gql } from "@apollo/client";

//follow the mutation shape on your graphql api
export const CREATE_BOOK_MUTATION = gql`
  mutation createBook($name: String!, $description: String!) {
    createBook(bookInput: { name: $name, description: $description }) {
      id
      name
      description
      Date
    }
  }
`;

export const UPDATE_BOOK_MUTATION = gql`
  mutation updateBook($id:Float!, $name: String, $description: String) {
    updateBook(bookInput: { id:$id, name: $name, description: $description }) {
      id
      name
      description
      Date
    }
  }
`;

export const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($id: Float!) {
    deleteBook(bookInput: { id: $id }) {
      id
      name
      description
      Date
    }
  }
`;
