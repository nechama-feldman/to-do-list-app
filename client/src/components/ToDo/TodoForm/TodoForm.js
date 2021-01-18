import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../../actions/toDoActions';

class TodoForm extends Component {
  state = { text: ''};

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.text, new Date().toLocaleString());
    this.setState({ text: '' });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="input"
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="Create a task..."
        />
      </form>
    );
  }
}

export default connect(
  null,
  { addTodo }
)(TodoForm);
