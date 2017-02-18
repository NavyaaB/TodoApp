import React, { Component } from 'react';
import {createStore} from 'redux';
import './App.css';



function todoApp(state=[],action){
  switch (action.type) {
    case 'ADD_TODO':
    if(state.length === 0)
    {
      var data=[]
    data.push({"id":0,"task":action.task,"completed":false})
      return data
    } else {
      data = state
      var id=data.length
    data.push({"id":id,"task":action.task,"completed":false})
      return data
    }
    case 'TOGGLE_COMPLETED':
    data = state
    for(var i=0; i<data.length;i++){
      if(data[i].id===action.id){
          data[i].completed = !data[i].completed
          break
      }
    }
      return data
      default:
      return state
  }
}
function getComp(data) {
  var count=0
  for (var i = 0; i < data.length; i++) {
    if(data[i].completed){
      count++
    }
  }
  return count
}
function getRemain(data) {
  var count=0
  for (var i = 0; i < data.length; i++) {
    if(!data[i].completed){
      count++
    }
}
return count
}


class TodoApp extends Component {
  constructor(props){
    super(props)
    this.state = {data:[]}
    this.store=createStore(todoApp)
    this.store.subscribe(() => this.setState({data: this.store.getState()}))
    this.addTodo=this.addTodo.bind(this)
  }
  addTodo(){
    if(this.refs.task.value!==""){
      this.store.dispatch({task: this.refs.task.value, type: 'ADD_TODO'})
      this.refs.task.value = "";
    }
  }
  changeStatus(item){
    this.store.dispatch({id:item.id, type: 'TOGGLE_COMPLETED'})
  }
  render() {
    const {data}=this.state;
    return (
      <div className="App">
        <h1>Add your todo tasks here </h1>
        <input ref="task" placeholder="enter here"></input>
        <button onClick={this.addTodo}>Add Task</button>
        <br></br>
        Total tasks: {data.length} <br></br>
        Tasks completed: {getComp(data)} <br></br>
        Tasks remaining: {getRemain(data)} <br></br>
      {data && data.length>0 ? data.map((item,i) => (
        <ul key={i}>
          <li onClick={this.changeStatus.bind(this,item)}>
            {item.completed ? <strike>{item.task}</strike>: item.task}
          </li>
        </ul>
      ))
    :null}
      </div>
    );
  }
}

export default TodoApp;
