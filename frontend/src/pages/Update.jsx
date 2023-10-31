import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UPDATE_BOOK_MUTATION } from "../Mutation";
import { useMutation } from "@apollo/client";
import { LOAD_BOOKS } from "../Queries";
import InputForm from "../components/InputForm";

export default function Update() {
  const [name, setName] = useState("");
  const [id, setID] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [updateBook, { error }] = useMutation(UPDATE_BOOK_MUTATION, {
    refetchQueries: [{ query: LOAD_BOOKS }, "getAllBooks"],
  });

  useEffect(() => {
    setID(+localStorage.getItem('ID'));
    setName(localStorage.getItem('Name'));
    setDescription(localStorage.getItem('Description'))
  },[]);

  const editBook = () => {
    console.log(typeof id)
    updateBook({
      variables: {
        id,
        name,
        description,
      },
    });

    if (error) {
      console.log(error);
    }
    return navigate("/");
  };

  return (
    <InputForm action={editBook} nameUpdater={setName} desUpdater={setDescription} name="UPDATE BOOK" value={{name,description}}/>
  );
}
