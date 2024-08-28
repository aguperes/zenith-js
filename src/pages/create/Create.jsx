import './Create.css'
import { useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useEffect } from 'react'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' }
]

export default function Create () {
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)


  useEffect(() => {
    if (documents) {
      const mappedUsers = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(mappedUsers)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }

    if (assignedUsers.length < 1) {
      setFormError('Please asign the project to at least one user')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((user) => {
      return { displayName: user.value.displayName, photoURL: user.value.photoURL, id: user.value.id }
    })

    const project = {
      name,
      details,
      category,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project)
    if (!response.error) {
      return navigate('/')
    }
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name: </span>
          <input type="text" required onChange={({ target }) => setName(target.value)} value={name} />
        </label>
        <label>
          <span>Project Details: </span>
          <textarea required onChange={({ target }) => setDetails(target.value)} value={details} />
        </label>
        <label>
          <span>Set Due Date: </span>
          <input type="date" required onChange={({ target }) => setDueDate(target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project Category: </span>
          <Select onChange={(option) => setCategory(option.value)} options={categories} theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#000',
              neutral0: '#0c0b10',
              primary25: '#0c0b10',
              primary50: '#000',
              primary75: '#000',
              neutral80: '#FFF',
              neutral10: '#2e302f',
              dangerLight: '#0c0b10',
              danger: '#FFF',
            },
          })} />
        </label>
        <label>
          <span>Asign User: </span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#000',
              neutral0: '#0c0b10',
              primary25: '#0c0b10',
              primary50: '#000',
              primary75: '#000',
              neutral80: '#FFF',
              neutral10: '#2e302f',
              dangerLight: '#0c0b10',
              danger: '#FFF',
            },
          })} />
        </label>
        {formError && <p className='error'>{formError}</p>}
        <button className='btn'>Create Project</button>
      </form>
    </div>
  )
}
