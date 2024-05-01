import React from 'react'
import {IoPersonSharp} from 'react-icons/io5'

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

class App extends React.Component {
  state = {
    tasks: [],
    filterAssignee: '',
    filterPriority: '',
    filterStartDate: '',
    filterEndDate: '',
    sortBy: '',
    upDatedFilteredTasks: [],
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem('tasksList')
    if (storedTasks != null) {
      const parsedTasks = JSON.parse(storedTasks)
      this.setState({tasks: parsedTasks, upDatedFilteredTasks: parsedTasks})
    }
  }

  updateLocalStorage = () => {
    const {tasks} = this.state
    localStorage.setItem('tasksList', JSON.stringify(tasks))
    this.clearFilters()
  }

  upDateFilterTasksAssignee = () => {
    const {filterAssignee, upDatedFilteredTasks} = this.state
    const newTasks = upDatedFilteredTasks.filter(t =>
      t.assignee.toLowerCase().includes(filterAssignee.toLowerCase()),
    )
    this.setState({upDatedFilteredTasks: newTasks})
  }

  upDateFilterTasksPriority = () => {
    const {filterPriority, upDatedFilteredTasks} = this.state
    const newTasks = upDatedFilteredTasks.filter(
      t => t.priority === filterPriority,
    )
    this.setState({upDatedFilteredTasks: newTasks})
  }

  upDateFilterTasksDate = () => {
    const {filterStartDate, filterEndDate, upDatedFilteredTasks} = this.state
    const newTasks = upDatedFilteredTasks.filter(
      t => t.startDate >= filterStartDate && t.startDate <= filterEndDate,
    )
    this.setState({upDatedFilteredTasks: newTasks})
  }

  addTask = task => {
    this.setState(
      prevState => ({
        tasks: [...prevState.tasks, task],
      }),
      this.updateLocalStorage,
    )
  }

  formatDate = date => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    day = String(day).padStart(2, '0')
    month = String(month).padStart(2, '0')

    return `${day}/${month}/${year}`
  }

  onEdit = (id, priority, status) => {
    const {tasks} = this.state

    if (status === 'com') {
      const endDate = this.formatDate(new Date())
      const updatedTasks = tasks.map(t =>
        t.taskId === id ? {...t, priority, status, endDate} : t,
      )
      this.setState({tasks: updatedTasks}, this.updateLocalStorage)
    } else {
      const updatedTasks = tasks.map(t =>
        t.taskId === id ? {...t, priority, status} : t,
      )
      this.setState({tasks: updatedTasks}, this.updateLocalStorage)
    }
  }

  deleteTask = id => {
    this.setState(
      prevState => ({
        tasks: prevState.tasks.filter(task => task.taskId !== id),
      }),
      this.updateLocalStorage,
    )
  }

  changeFilterAssignee = e => {
    this.setState(
      {filterAssignee: e.target.value},
      this.upDateFilterTasksAssignee,
    )
  }

  changeFilterPriority = e => {
    this.setState(
      {filterPriority: e.target.value},
      this.upDateFilterTasksPriority,
    )
  }

  changeFilterStartDate = e => {
    this.setState({filterStartDate: e.target.value}, this.upDateFilterTasksDate)
  }

  changeFilterEndDate = e => {
    this.setState({filterEndDate: e.target.value}, this.upDateFilterTasksDate)
  }

  changeSortBy = e => {
    this.setState({sortBy: e.target.value})
  }

  clearFilters = () => {
    const {tasks} = this.state
    this.setState({
      filterAssignee: '',
      filterPriority: '',
      filterStartDate: '',
      filterEndDate: '',
      sortBy: '',
      upDatedFilteredTasks: tasks,
    })
  }

  render() {
    const {
      filterAssignee,
      filterPriority,
      filterStartDate,
      filterEndDate,
      sortBy,
      upDatedFilteredTasks,
    } = this.state

    return (
      <div className="main-cont">
        <div className="d-flex justify-content-between align-items-center top-cont">
          <h1 className="main-head">Task Board</h1>
          <div className="profile-cont">
            <IoPersonSharp className="profile-icon" />
          </div>
        </div>
        <div className="center-cont">
          <div className="filter-sort">
            <div>
              <div className="d-flex mb-2">
                <p className="filter-text">Filter By :</p>
                <input
                  className="filter-input ml-3 mr-3"
                  placeholder="Assingee Name"
                  value={filterAssignee}
                  onChange={this.changeFilterAssignee}
                />
                <select
                  className="mr-3"
                  value={filterPriority}
                  onChange={this.changeFilterPriority}
                >
                  <option selected hidden>
                    Priority
                  </option>
                  <option>P0</option>
                  <option>P1</option>
                  <option>P2</option>
                </select>
                <div className="dates-cont">
                  <input
                    className="filter-input date-input"
                    type="date"
                    value={filterStartDate}
                    onChange={this.changeFilterStartDate}
                  />
                  -
                  <input
                    className="filter-input date-input"
                    type="date"
                    value={filterEndDate}
                    onChange={this.changeFilterEndDate}
                  />
                </div>

                <button
                  type="button"
                  className="trigger-button ml-4 clear-filters"
                  onClick={this.clearFilters}
                >
                  Clear Filters
                </button>
              </div>
              <div className="d-flex mt-4">
                <p className="filter-text">Sort By :</p>
                <select
                  className="ml-3"
                  value={sortBy}
                  onChange={this.changeSortBy}
                >
                  <option selected hidden>
                    Priority
                  </option>
                  <option value="high">Priority High</option>
                  <option value="low">Priority Low</option>
                </select>
              </div>
            </div>
            <div>
              <TaskForm onSubmit={this.addTask} />
            </div>
          </div>
          {upDatedFilteredTasks.length > 0 ? (
            <TaskList
              tasks={upDatedFilteredTasks}
              onDelete={this.deleteTask}
              onEdit={this.onEdit}
              sortBy={sortBy}
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center no-task">
              <p className="no-task-text">No tasks available</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
