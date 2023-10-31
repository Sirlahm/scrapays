import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import { 
  Box, 
  SimpleGrid,
  Text,
  Flex,
  Heading,
  Card, 
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Divider,
  Button
} from "@chakra-ui/react"
// import { useLoaderData } from "react-router-dom"
import { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { LOAD_BOOKS } from "../Queries"
import {DELETE_BOOK_MUTATION } from '../Mutation'
import { useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

export default function Dashboard() {
  const {error, data} = useQuery(LOAD_BOOKS);
  const { isAuthenticated } = useAuth0();

  const [books, setBooks] = useState([]);
  const navigate = useNavigate ();
  const [deleteBook, {mutationerror}] = useMutation(DELETE_BOOK_MUTATION,{
    refetchQueries: [
      {query: LOAD_BOOKS},
      'getAllBooks'
    ],
  });

  useEffect(() => {
    console.log(data,"yaya")
    if(data){
      setBooks(data.getAllBooks)
    }

    if(error){
      console.log(error)
    }
  }, [data]);

  const removeBook = (id) => {
    deleteBook({
      variables:{
        id
      }
    })
   
    if(mutationerror){
      console.log(mutationerror)
    }
    
  }

  const setBookDetails = (book) => {
    let {id,description,name} = book;
    localStorage.setItem('ID', id);
    localStorage.setItem('Description', description)
    localStorage.setItem('Name', name)
    navigate("/update")
  }


  return (
    <SimpleGrid spacing={10} minChildWidth={300}>
      {console.log(books)}
      {books && books.map(book => (
        <Card key={book.id} borderTop="8px" borderColor="black" bg="white">

          <CardHeader color="gray.700">
            <Flex gap={5}>
              <Box>
                <Heading as="h3" size="sm">Book: {book.name}</Heading>
              </Box>
            </Flex>
          </CardHeader>

          <CardBody color="gray.500">
          <Text as="h3">Description:</Text>
            <Text>{book.description}</Text>
          </CardBody>

          <Divider borderColor="gray.200" />

          <CardFooter>
            <HStack>
             {isAuthenticated && <Button onClick={()=> removeBook(book.id)} variant="ghost" leftIcon={<DeleteIcon />}>Delete</Button>}
              {isAuthenticated && <Button variant="ghost" leftIcon={<EditIcon />} onClick={()=> setBookDetails(book)}>Edit</Button>}
            </HStack>
          </CardFooter>

        </Card>
      ))}
    </SimpleGrid>
  )
}
