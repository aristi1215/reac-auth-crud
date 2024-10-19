import { useTaskContext } from "../context/TasksContext";
import { useEffect } from "react";
import { TaskCard } from "./TaskCard";

export const TasksList = () => {
  const { getTasks, tasks, loading  } = useTaskContext();
  
  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks(); 
    };
    fetchTasks();
  }, []);

  const renderTasks = () => {
    if(loading){
        return <h1>Loading tasks</h1>
    }else if (tasks?.length === 0){
        return <h1>No tasks found</h1>
    }else{
       return (<div>
            {tasks?.map(task => (
                <TaskCard key={task?.id} task={task} />
            ))}
        </div>)
    }
  }

  return (
    renderTasks()
  )
};
