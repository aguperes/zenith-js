import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email: </span>
        <input required type="email" onChange={({ target }) => setEmail(target.value)} value={email} />
      </label>
      <label>
        <span>Password: </span>
        <input required type="password" onChange={({ target }) => setPassword(target.value)} value={password} />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>loading</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
