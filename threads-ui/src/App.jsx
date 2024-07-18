import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import "./App.css"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Container maxW={"620px"}>
      <Header/>
      <Routes>
        <Route path="/:username" element={<UserPage/>}/>
        <Route path="/:username/post/:pid" element={<PostPage/>}/>
      </Routes>
    </Container>
      
    </>
  )
}

export default App
