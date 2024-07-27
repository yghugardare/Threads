
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import "./App.css"
import AuthPage from './pages/AuthPage'
function App() {
  

  return (
    <>
    <Container maxW={"620px"}>
      <Header/>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path="/:username" element={<UserPage/>}/>
        <Route path="/:username/post/:pid" element={<PostPage/>}/>
      </Routes>
    </Container>
      
    </>
  )
}

export default App
