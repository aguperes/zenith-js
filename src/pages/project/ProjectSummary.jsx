import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProjectSummary ({ project }) {
  const { user } = useAuthContext()
  const { deleteDocument } = useFirestore('projects')
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteDocument(project.id)
    navigate('/')
  }

  return (
    <div>
      <div className='project-summary'>
        <h2 className='project-title'>{project.name}</h2>
        <p className='created-by'>Created by:  {project.createdBy.displayName}</p>
        <p className='due-date'>
          Project due by: {project.dueDate.toDate().toDateString()}
        </p>
        <div className='project-summary-container'>
          <p className='details'>{project.details}</p>
          <footer>
            <h4>Project is assigned to: </h4>
            <div className='assigned-users'>
              {project.assignedUsersList.map((user) => (
                <div key={user.id}>
                  <Avatar src={user.photoURL} />
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
      {/* {user.uid === project.createdBy.id && <button onClick={handleDelete} className='btn'>Mark as complete</button>} */}
      <button onClick={handleDelete} className='btn'>Mark as complete</button>
    </div>

  )
}
