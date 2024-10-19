import { useState } from "react"
import { useTaskContext } from "../context/TasksContext"

export const TaskForm = () => {

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [done,setDone] = useState(false)
    const [error, setError] = useState('')
    const {createTasks, adding} = useTaskContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title || !description){
            setError('Escriba bien, marque bien. Careverga')
            return
        }

        createTasks(title, description)
      
        setTitle('')
        setDescription('')
        setError('')
    }
  
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title" name="title" />
        <label htmlFor="description">Description</label>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" id="description" name="description" />
        <label htmlFor="checkbox">Done?</label>
        <input type="checkbox" value={done} onClick={() => setDone(!done)} />
        <button disabled={adding}>{
            adding ? 'Enviando bobo'
                   : 'Enviate bobo'
        }</button>
        <span>{error}</span>
    </form>
  )
}
