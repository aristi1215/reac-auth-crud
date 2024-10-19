import { Link } from "react-router-dom"
import { supabase } from "../supabase/client"
import { TaskForm } from "./TaskForm"
import { TasksList } from "./TasksList"
import { useTaskContext } from "../context/TasksContext"


export const Home = () => {
  const {user, showDone, setShowDone} = useTaskContext()

  const handleLogOut = () => {
    supabase.auth.signOut()
  }

  return (
    <>
    <header>
      <span>Home</span>
      <Link to={'/login'}>Login</Link>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
    <button onClick={() => setShowDone(!showDone)}>{showDone ? 'Show tasks unfinished' : 'Show tasks done'}</button>
    <main>
        <TaskForm user={user} />
        <TasksList />
    </main>
    </>
  )
}
