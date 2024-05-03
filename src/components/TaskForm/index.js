import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import {v4 as uuidv4} from 'uuid'

class TaskForm extends React.Component {
  state = {
    title: '',
    description: '',
    team: '',
    assignee: '',
    priority: 'P0',
    status: 'pen',
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  formatDate = date => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    day = String(day).padStart(2, '0')
    month = String(month).padStart(2, '0')

    return `${day}/${month}/${year}`
  }

  addClick = () => {
    const {onSubmit} = this.props
    const dateToday = this.formatDate(new Date())
    onSubmit({taskId: uuidv4(), ...this.state, startDate: dateToday})

    this.setState({
      title: '',
      description: '',
      team: '',
      assignee: '',
      priority: 'P0',
      status: 'pen',
    })
  }

  render() {
    const {title, description, team, priority, assignee} = this.state

    return (
      <div className="form-cont">
        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                Add New Task
              </button>
            }
            contentStyle={{width: '400px', padding: '0px'}}
          >
            {close => (
              <div className="create-cont">
                <div className="bg-white2">
                  <p className="create-text">CREATE A TASK</p>
                  <IoIosCloseCircleOutline
                    onClick={() => close()}
                    className="close-icon"
                  />
                </div>
                <div className="bg-color">
                  <div className="d-flex">
                    <label className="label-prop" htmlFor="title">
                      Title:
                    </label>
                    <input
                      className="input-prop4"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="d-flex">
                    <label className="label-prop" htmlFor="description">
                      Description:
                    </label>
                    <textarea
                      className="input-prop4"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                    >
                      .
                    </textarea>
                  </div>
                  <div className="d-flex">
                    <label className="label-prop" htmlFor="team">
                      Team:
                    </label>
                    <input
                      className="input-prop4"
                      name="team"
                      value={team}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="d-flex">
                    <label className="label-prop" htmlFor="assignee">
                      Assignee:
                    </label>
                    <input
                      className="input-prop4"
                      type="text"
                      name="assignee"
                      value={assignee}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="label-prop" htmlFor="priority">
                      Priority:
                    </label>
                    <select
                      className="input-prop4"
                      style={{width: '50px'}}
                      type="text"
                      name="priority"
                      value={priority}
                      onChange={this.handleInputChange}
                    >
                      <option value="P0">P0</option>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                    </select>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        this.addClick()
                        close()
                      }}
                      className="trigger-button"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default TaskForm
