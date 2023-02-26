import { Link } from 'react-router-dom'
import axiosClient from '../axios-client.js'
import { createRef } from 'react'
import { useStateContext } from '../context/ContextProvider.jsx'
import { useState } from 'react'

export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div id="identity">
        <span className="titleTest">
          Prueba para <span className="subtitleTest">SoccerSystempro</span>
        </span>
        <span className="devName">Fabian Armando Espinosa Hernandez</span>
        <span>fabianespinosa1988@gmail.com</span>
        <span>+34600390584</span>
        <a target='_blank' href='https://www.linkedin.com/in/faehz/'>linkedIn</a>
        <a target='_blank' href='https://github.com/FabianEspinosa'>gitHub</a>

      </div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Ingresa a tu cuenta</h1>
          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Aún no estas registrado? <Link to="/signup">Crea una cuenta</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
