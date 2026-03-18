import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/todos";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

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
            <Text key={t.id}>{t.title}</Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}

export default App;