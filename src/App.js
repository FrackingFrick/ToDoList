import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

const URL='http://localhost:3001/'

function App() {
  const [tasks,setTasks]=useState([])
  const [task, setTask]=useState('')

  function save(){
    const json=JSON.stringify({description: task})
    axios.post(URL + 'new',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const addedObject=JSON.parse(json)
      addedObject.id=response.data.id
      setTasks(tasks =>[...tasks,addedObject])
      setTask('')
    }).catch(error =>{
      alert(error.response.data.error)
    })
  }
  function remove(id){
    axios.delete(`${URL}delete/${id} `)
    .then(()=>{
      const newListWithoutRemoved=tasks.filter((item)=> item.id !==id)
      setTasks(newListWithoutRemoved)
    }).catch ((error)=> {
      alert(error.response.data.error)
    })
  }

  useEffect(()=> {
    axios.get(URL)
    .then((response)=> {
      setTasks(response.data)
    }).catch(error => {
      alert(error.response.data.error)
    })
  }, [])
  return (
    <div>
      <h3>My tasks</h3>
      <form>Add new
      <input value={task} onChange={e=> setTask(e.target.value)}/>
      <button type='button' onClick={save}>Save</button>
      </form>
      <ol>
        {tasks.map(task =>(
          <li key={task.id}>{task.description} <a href="#" onClick={()=> remove(task.id)}>Delete</a></li>
        ))}
      </ol>
    </div>
  );
}

export default App;
