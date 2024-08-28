import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar () {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='logo' />
          <span className='page-title'>Zenith</span>
        </li>
        {!user && <li>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </li>}
        {user && <li>
          {!isPending && <button className='btn' onClick={logout}>Logout</button>}
          {isPending && <button className='btn' disabled>Logging out...</button>}
        </li>}
      </ul>
    </nav >
  )
}

