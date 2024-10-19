import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

// Crear y exportar el contexto
export const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TasksContextProvider");
  }
  return context;
};

export const TasksContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDone, setShowDone] = useState(false)
  const navigate = useNavigate();

  const fetchSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      navigate("/login");
      return null;
    }
    
    return session.user; 
  };

  const getTasks = async () => {
    setLoading(true);

    const user = await fetchSession();
    
    if (!user) {
      console.log("Usuario no disponible aún");
      setLoading(false);
      return;
    }

    const { data: tasks, error } = await supabase
      .from("tasks")
      .select()
      .eq("user_id", user.id)
      .eq('done', showDone)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      return;
    }

    setTasks(tasks);
    setLoading(false);
  };

  useEffect(() => {
    getTasks()
  },[showDone])

  const createTasks = async (title, description) => {
    setAdding(true);

    const user = await fetchSession();
    if (!user) {
      setAdding(false);
      console.log("Usuario no disponible para crear tarea");
      return;
    }

    try {
      const {error, data} = await supabase.from("tasks").insert({
        user_id: user.id,
        title,
        description,
      }).select();

      if (error) throw new Error('Error creando tarea', error);

      setTasks((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('error creando', error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = await fetchSession()
    const {error} = await supabase.from('tasks').delete().eq('user_id', user.id).eq('id', id)
    if(error) throw new Error('error en la peticion', error)

    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = async (id, done) => {
    const user = await fetchSession()
    console.log(id, done)
    const {data, error} = await supabase.from('tasks').update({done}).eq('user_id', user.id).eq('id', id).select()
    if(error) throw error
    console.log(data)
    setTasks(prev => (
        prev.map(task => {
            if(task.id === id){
                return {...task, done}
            }
            return task
        })
    ))
  }

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, getTasks, createTasks, deleteTask, adding, loading, updateTask, showDone, setShowDone}}
    >
      {children}
    </TaskContext.Provider>
  );
};
