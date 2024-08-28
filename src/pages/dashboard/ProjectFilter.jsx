const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter ({ currentFilter, changeFilter }) {

  return (
    <div className='project-filter'>
      <p>Filter by: </p>
      <nav>
        {filterList.map((filter) => (
          <button className={filter === currentFilter ? 'active' : ''} onClick={() => changeFilter(filter)} key={filter}>{filter}</button>
        ))}
      </nav>
    </div>
  )
}
