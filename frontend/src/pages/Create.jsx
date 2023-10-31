import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CREATE_BOOK_MUTATION } from '../Mutation'
import { useMutation } from '@apollo/client'
import { LOAD_BOOKS } from '../Queries'
import InputForm from '../components/InputForm'

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const [createBook, {error}] = useMutation(CREATE_BOOK_MUTATION,{
    refetchQueries: [
      {query: LOAD_BOOKS},
      'getAllBooks'
    ],
  });

  function addBook(){
    createBook({
      variables:{
        name,
        description
      }
    })

    if(error){
      console.log(error)
    }
    return navigate('/')
  }

  return (
    <InputForm action={addBook} nameUpdater={setName} desUpdater={setDescription} name="CREATE BOOK"/>
  )
}
