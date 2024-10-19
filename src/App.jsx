import './App.css'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { useEffect } from 'react'
import { NotFound } from './components/NotFound'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './supabase/client'
import { useNavigate } from 'react-router-dom'
import { TasksContextProvider } from './context/TasksContext'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if(!session){
        navigate('/login')
      }else{
        navigate('/')
      }
    })
  },[])

  return (
    <TasksContextProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </TasksContextProvider>
  )
}

export default App
