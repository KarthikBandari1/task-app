import React from 'react'
import Task from '../Task'
import './index.css'

class TaskList extends React.Component {
  render() {
    const {tasks, onDelete, onEdit, sortBy} = this.props

    const comparePriority = (task1, task2) => {
      const priorityOrder = {P0: 0, P1: 1, P2: 2}

      const priorityValue1 = priorityOrder[task1.priority]
      const priorityValue2 = priorityOrder[task2.priority]
      if (sortBy === 'high') {
        return priorityValue2 - priorityValue1
      }
      return priorityValue1 - priorityValue2
    }

    const filteredTasks = category => {
      const filtered = tasks.filter(value => value.status === category)
      if (sortBy !== '') {
        filtered.sort(comparePriority)
      }

      return filtered
    }

    return (
      <div className="task-list">
        <div className="pending-cont">
          <p className="pending-text">Pending</p>
          <div className="task-cont">
            {filteredTasks('pen').map(task => (
              <Task task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
        <div className="pending-cont">
          <p className="pending-text inp-text">In Progress</p>
          <div className="task-cont">
            {filteredTasks('inp').map(task => (
              <Task task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
        <div className="pending-cont">
          <p className="pending-text com-text">Completed</p>
          <div className="task-cont">
            {filteredTasks('com').map(task => (
              <Task task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
        <div className="pending-cont">
          <p className="pending-text dep-text">Deployed</p>
          <div className="task-cont">
            {filteredTasks('dep').map(task => (
              <Task task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
        <div className="pending-cont">
          <p className="pending-text def-text">Deffered</p>
          <div className="task-cont">
            {filteredTasks('def').map(task => (
              <Task task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default TaskList
