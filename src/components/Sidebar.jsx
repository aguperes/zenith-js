import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Sidebar () {
  const { user } = useAuthContext()
  const { photoURL, displayName } = user

  return (
    <aside className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <Avatar src={photoURL} />
          <p>{displayName}</p>
        </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to='/create'>
                <img src={AddIcon} alt="add project icon" />
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}


