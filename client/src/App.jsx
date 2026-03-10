import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Heading, Button, Input, VStack, ButtonGroup } from "@chakra-ui/react"


function App() {
  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Todo App</Heading>
      <ButtonGroup>
        <Button colorScheme="teal">
          Add Todo
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default App
