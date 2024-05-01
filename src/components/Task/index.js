import {Component} from 'react'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import Popup from 'reactjs-popup'
import './index.css'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editPriority: props.task.priority,
      editStatus: props.task.status,
    }
  }

  onEditPriority = e => {
    this.setState({editPriority: e.target.value})
  }

  onEditStatus = e => {
    this.setState({editStatus: e.target.value})
  }

  onEditClick = () => {
    const {onEdit, task} = this.props
    const {editPriority, editStatus} = this.state

    onEdit(task.taskId, editPriority, editStatus)
  }

  onDeleteClick = () => {
    const {onDelete, task} = this.props
    onDelete(task.taskId)
  }

  getStatus = status => {
    switch (status) {
      case 'pen':
        return 'Assign'
      case 'inp':
        return 'In Progress'
      case 'com':
        return 'Completed'
      case 'dep':
        return 'Deployed'
      case 'def':
        return 'Deffered'
      default:
        return ''
    }
  }

  render() {
    const {editPriority, editStatus} = this.state
    const {task} = this.props

    const {
      title,
      description,
      startDate,
      endDate,
      status,
      team,
      assignee,
      priority,
    } = task

    return (
      <div className="task-each">
        <div className="d-flex justify-content-between">
          <h5>{title}</h5>
          <p className="priority">{priority}</p>
        </div>
        <hr className="hr-prop" />
        <p>{description}</p> <p className="assign mb-0">@{assignee}</p>
        <div className="d-flex ">
          <p className="date">{startDate}</p>
          {status === 'com' && <p className="date">- {endDate}</p>}
        </div>
        <div className="d-flex">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button edit">
                Edit
              </button>
            }
            contentStyle={{width: '230px', padding: '0px'}}
          >
            {close => (
              <div className="create-cont">
                <div className="bg-white">
                  <p className="create-text">EDIT TASK</p>
                  <IoIosCloseCircleOutline
                    onClick={() => close()}
                    className="close-icon"
                  />
                </div>
                <div className="bg-color-edit">
                  <div className="d-flex flex-column">
                    <label className="label-prop" htmlFor="title">
                      Title:
                    </label>
                    <input
                      className="input-prop"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className="label-prop" htmlFor="description">
                      Description:
                    </label>
                    <textarea
                      className="input-prop"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                      readOnly
                    >
                      .
                    </textarea>
                  </div>
                  <div className="d-flex flex-column">
                    <label className="label-prop" htmlFor="team">
                      Team:
                    </label>
                    <input
                      className="input-prop"
                      name="team"
                      value={team}
                      onChange={this.handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className="label-prop" htmlFor="assignee">
                      Assignee:
                    </label>
                    <input
                      className="input-prop"
                      type="text"
                      name="assignee"
                      value={assignee}
                      onChange={this.handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="d-flex mt-4 justify-content-between">
                    <div className="d-flex ">
                      <label className="label-prop2" htmlFor="priority">
                        Priority:
                      </label>
                      <select
                        className="input-prop2"
                        style={{width: '50px'}}
                        type="text"
                        name="priority"
                        value={editPriority}
                        onChange={this.onEditPriority}
                      >
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                      </select>
                    </div>
                    <div className="d-flex">
                      <label htmlFor="Status">Status :</label>
                      <select
                        className="input-prop2"
                        style={{width: '120px'}}
                        type="text"
                        name="Status"
                        value={editStatus}
                        onChange={this.onEditStatus}
                      >
                        <option value="pen">Pending</option>
                        <option value="inp">In Progress</option>
                        <option value="com">Completed</option>
                        <option value="dep">Deployed</option>
                        <option value="def">Deffered</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        this.onEditClick()
                        close()
                      }}
                      className="trigger-button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button edit">
                Delete
              </button>
            }
            contentStyle={{width: '350px', padding: '0px'}}
          >
            {close => (
              <div className="create-cont">
                <div className="bg-white">
                  <p className="create-text">DELETE TASK</p>
                  <IoIosCloseCircleOutline
                    onClick={() => close()}
                    className="close-icon"
                  />
                </div>
                <div className="bg-color5">
                  <p>Do You Wish to Delete Task</p>
                  <div className="delete-popup-down">
                    <div className="del-text">
                      <p>{title}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          this.onDeleteClick()
                          close()
                        }}
                        className="trigger-button mr-3 yes"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => close()}
                        className="trigger-button yes"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <p className="status">{this.getStatus(status)}</p>
      </div>
    )
  }
}

export default Task
