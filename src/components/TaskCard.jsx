import { useTaskContext } from "../context/TasksContext"

export const TaskCard = ({task}) => {

    const {deleteTask, updateTask} = useTaskContext()

    const handleDelete = (id) => {
        deleteTask(id)
    }
    const handleUpdate = (id, done) => {
        console.log('hola',done)
        done ? updateTask(id, false)
        : updateTask(id, true)
    }

  return (
    <div>
        <h1>{task?.title}</h1>
        <p>{task?.description}</p>
        <input onClick={() => handleUpdate(task?.id, task?.done)} type="checkbox" defaultChecked={task?.done} />&nbsp;&nbsp;
        <button onClick={() => handleDelete(task?.id)}>Delete</button>
    </div>
  )
}
