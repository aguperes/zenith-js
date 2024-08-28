import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

import './Signup.css'

export default function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, error, isPending } = useSignup()

  const handleFileChange = ({ target }) => {
    setThumbnail(null)
    let selected = target.files[0]

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }

    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100b')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated');
  }

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setDisplayName('')
    setThumbnail(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
    clearForm()
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Email: </span>
        <input required type="email" onChange={({ target }) => setEmail(target.value)} value={email} />
      </label>
      <label>
        <span>Password: </span>
        <input required type="password" onChange={({ target }) => setPassword(target.value)} value={password} />
      </label>
      <label>
        <span>Display Name: </span>
        <input required type="text" onChange={({ target }) => setDisplayName(target.value)} value={displayName} />
      </label>
      <label>
        <span>Profile thumbnail: </span>
        <input type="file" required onChange={handleFileChange} accept='image/*' />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
