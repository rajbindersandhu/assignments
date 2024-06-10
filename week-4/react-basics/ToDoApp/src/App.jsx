import { useState } from 'react'
import './App.css'

function App() {
  const [todoList, setToDoList] = useState([])

  return (
    <div>
      <div className="card">
        <TodoInputContainer todoList={todoList} setToDoList={setToDoList}/>
      </div>
      <div id='list'>
        {todoList.map((task, id) => <Task id={id} title={task.title} desc={task.desc} />)}
      </div>
    </div>
  )
}

function TodoInputContainer(props){
  console.log("Todo form")
  function clickHandler(){
    const newList = [...props.todoList];
    const newObj = {
      title: document.getElementById('title').value,
      desc: document.getElementById("desc").value
    }
    newList.push(newObj);
    props.setToDoList(newList);
  }

  return (
    <div>
      <input id='title' placeholder='Title'/>
      <br/>
      <input id='desc' placeholder='Description'/>
      <br/>
      <button onClick={clickHandler}>Add to Todo</button>
    </div>
  )
}

function Task(props){
  console.log("task");
  return (
      <div id={props.id}>
        <p>{props.title}</p>
        <p>{props.desc}</p>
      </div>
  )
}


export default App
