import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../../actions/toDoActions';
import './ToDo.scss';

class Todo extends Component {
  state = { editing: false, text: '' };
  componentDidMount = () => this.setState({ text: this.props.name});

  handleDeleteTodo = e => {
    e.stopPropagation();
    this.props.deleteTodo();
  };

  showEditForm = e => {
    e.stopPropagation();
    this.setState(prevState => ({ editing: !prevState.editing }));
  };

  onInputClick = e => {
    e.stopPropagation();
  };

  onInputChange = e => {
    this.setState({ text: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({ editing: !prevState.editing }));
    this.props.updateTodo(this.props.id, this.state.text, new Date().toLocaleString());
  };

  render() {
    const { name, done, created, edited, toggleTodo, currTab } = this.props;

    return (
      <li
        className="task"
        style={{
          textDecoration: done ? 'line-through' : '',
          color: done ? '#bdc3c7' : '#34495e'
        }}
      >
        <span style={{ display: this.state.editing ? 'none' : '' }}>
          {name}
        </span>
        {
        currTab === 'created' ? 
        <span style={{ display: this.state.editing ? 'none' : ''}} className="date">
          Created At: {created.split('GMT')[0]}
        </span> : currTab === 'edited' ?
        <span style={{ display: this.state.editing ? 'none' : ''}} className="date">
          { edited !== '' ? 'Edited At:' : '' }{edited.split('GMT')[0]}
        </span> : ''
        }
        <form
          className="form"
          style={{ display: this.state.editing ? 'inline' : 'none' }}
          onSubmit={this.onFormSubmit}
        >
          <input
            className="edit-todo"
            type="text"
            value={this.state.text}
            onClick={this.onInputClick}
            onChange={this.onInputChange}
          />
        </form>
        <span className="icon trash" onClick={this.handleDeleteTodo}>
          <i className="far fa-trash-alt" />
        </span>
        <span className="icon set-done" onClick={toggleTodo}>
          <i className= {done ? "far fa-square" : "far fa-check-square" } />
        </span>
        <span className="icon edit" onClick={this.showEditForm}>
          <i className="far fa-edit" />
        </span>
      </li>
    );
  }
}

export default connect(
  null,
  { updateTodo }
)(Todo);


