import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!todo) return;
    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <Box p={4} maxW="400px" mx="auto">
      <VStack spacing={4}>
        <Input
          placeholder="Enter a todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addTodo}>
          Add Todo
        </Button>
        <VStack spacing={2} align="start" w="100%">
          {todos.map((t, index) => (
            <Text key={index}>{t}</Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default App;