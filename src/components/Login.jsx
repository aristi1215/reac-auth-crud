import { useState } from "react"
import { supabase } from "../supabase/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email,setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
      supabase.auth.onAuthStateChange((event,session) => {
        if(session){
          navigate('/')
        }
        console.log(session,event)
      })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!email){
            setEmailError('Please provide an email')
            return
        }
        setEmailError('')
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: 'example-password',
        })

          if(error){
            console.error('An error has occurred', error)
            return
          }
    }

  return (
    <section>
            <form action=""  onSubmit={handleSubmit}>
                <input onChange={e => setEmail(e.target.value || '' )} value={email} type="email" name="email" id="email" placeholder="Youremail@gmail.com" />
                <span>{emailError}</span>
                <button>Send</button>
            </form>
    </section>
  )
}
