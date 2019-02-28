import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    value:"",
    todos: todosList
  };

  //create todo
  handleKeyPress = (event)=>{
    
    if(event.key === 'Enter'){

      if(event.target.value !== ""){
        const newtodos = this.state.todos.slice();
        let newEntry = {"userId":1, "id":Math.ceil(Math.random()*1000000), "title":event.target.value,"completed":false};
        newtodos.push(newEntry);
        this.setState({todos:newtodos,value:""});
        
        
      }
    }
  }
  handleDeleteTodo = id=>event=>{
    const newtodos = this.state.todos.filter(
      todo => todo.id !== id
    );
    this.setState({ todos: newtodos });
  }
  handleClearComplete = ()=>{
    const newtodos = this.state.todos.filter(
      todo=>todo.completed === false
    );
    this.setState({ todos: newtodos });
    
  }
  toggleComplete = (id)=>(event)=>{
    console.log(this.state);
  
    let newtodos =this.state.todos.map((todo)=>{
      if(todo.id===id){
        return{
          "UserId":todo.userId,
          "id":todo.id,
          "title":todo.title,
          "completed": !todo.completed
        };
      }
      else{
        return todo;
      }
    })
  this.setState({
    todos:newtodos
  })
}
handleOnChange = (event)=>{
  this.setState({value: event.target.value})
}
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus onKeyPress={this.handleKeyPress} onChange={this.handleOnChange} value={this.state.value}
          />
        </header>
        <TodoList todos={this.state.todos} toggleComplete={this.toggleComplete} handleDeleteTodo={this.handleDeleteTodo}/>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed" onClick={this.handleClearComplete}>Clear completed</button>
    </footer>
    </section>
    );
  }
}

class TodoItem extends Component {
  
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed} onChange={this.props.toggleComplete}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo}/>
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem key={todo.id} title={todo.title} completed={todo.completed} toggleComplete={this.props.toggleComplete(todo.id)} handleDeleteTodo={this.props.handleDeleteTodo(todo.id)}/>
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
