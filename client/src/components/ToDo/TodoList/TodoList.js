import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from '../Todo';
import { getTodos, toggleTodo, deleteTodo, toggleTab } from '../../../actions/toDoActions';
import { TABS } from '../../../actions/types';
import TodoForm from '../TodoForm/TodoForm';
import './TodoList.scss';

class TodoList extends Component {
  
  componentDidMount = async () => {
    this.props.getTodos();
    try {
      setInterval(async () => {
        this.props.getTodos();
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  };

  removeComplete = () => {
    this.props.todos.forEach(({ done, _id }) => {
      if (done) this.props.deleteTodo(_id);
    });
  };

  removeAll = () => {
    this.props.todos.forEach(({ _id }) => {
      this.props.deleteTodo(_id);
    });
  };

  renderTodos = todos => {
    return todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          id={todo._id}
          name={todo.name}
          done={todo.done}
          created={todo.created}
          edited={todo.edited}
          toggleTodo={() => this.props.toggleTodo(todo._id)}
          deleteTodo={() => this.props.deleteTodo(todo._id)}
          currTab={this.props.currTab}
        />
      );
    });
  };

  renderTabs = currTab => {
    return TABS.map(tab => {
      let tabVal = tab === 'created' ? 'sort by tated created' : tab === 'edited' ? 'sort by date edited' : tab;
      return (
        <button
          key={tab}
          className={tab === currTab ? 'button selected' : 'button'}
          onClick={() => this.props.toggleTab(tab)}
        >
          {tabVal}
        </button>
      );
    });
  };

  render() {
    let todos = [];

    if (this.props.currTab === 'all') {
      todos = this.props.todos;
    } else if (this.props.currTab === 'active') {
      todos = this.props.todos.filter(todo => !todo.done);
    } else if (this.props.currTab === 'done') {
      todos = this.props.todos.filter(todo => todo.done);
    } else if (this.props.currTab === 'created') {
      todos = this.props.todos.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
    } else if (this.props.currTab === 'edited') {
      todos = this.props.todos.sort((a, b) => Date.parse(a.edited) - Date.parse(b.edited));
    }

    return (
      <article>
        <TodoForm />
        {this.props.todos.length ? (
          <div style={{ marginBottom: 20, marginLeft: 10 }}>
            {this.props.todos.filter(todo => !todo.done).length} todos left
          </div>
        ) : null}

        <div>
          {this.props.todos.length ? this.renderTabs(this.props.currTab) : null}
          {this.props.todos.some(todo => todo.done) ? (
            <button className="button clear" onClick={this.removeComplete}>
              remove done 
            </button>
          ) : null}
          {this.props.todos.length ? (
            <button className="button clear" onClick={this.removeAll}>
              remove All
            </button>
          ) : null}
        </div>
        <ul style={{ paddingLeft: 10 }} className="list">
          {this.props.todos.length ? this.renderTodos(todos) : (<label>There are no tasks in your list</label>)}
        </ul>
      </article>
    );
  }
}

const mapStateToProps = ({ todos, currTab }) => {
  return { todos, currTab };
};

export default connect(
  mapStateToProps,
  { getTodos: getTodos, toggleTodo, deleteTodo, toggleTab }
)(TodoList);
