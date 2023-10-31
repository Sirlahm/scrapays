import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

export default function InputForm({action,nameUpdater, desUpdater, name ,value}) {
  return (
    <Box maxW="480px">
      <Form method="post" action="/create">
        <FormControl isRequired mb="40px">
          <FormLabel>Book name:</FormLabel>
          <Input
            type="text"
            name="title"
            onChange={(e) => nameUpdater(e.target.value)}
            value={value?.name}
            required
          />
          <FormHelperText>Enter a descriptive task name.</FormHelperText>
        </FormControl>

        <FormControl isRequired mb="40px">
          <FormLabel>Book description:</FormLabel>
          <Textarea
            placeholder="Enter a detailed description for the book..."
            name="description"
            onChange={(e) => desUpdater(e.target.value)}
            value={value?.description}
          />
        </FormControl>
        <Button onClick={action}>{name}</Button>
      </Form>
    </Box>
  );
}
