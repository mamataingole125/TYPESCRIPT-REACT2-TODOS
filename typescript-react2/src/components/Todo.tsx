import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

export interface ITodo{
    title:string;
    status:boolean;
    id:number;
    
}

const Todo = () => {

    const [todos,setTodos]=useState<ITodo[]>([])


    const handleClick=(title:string)=>{

        const payload ={
            title,
            status:false

        }

       axios.post("http://localhost:8080/todos",payload)
       .then(getTodos)
       

    }


const getTodos=()=>{

    axios.get("http://localhost:8080/todos")
    .then((res:AxiosResponse<ITodo[]>)=>{

        setTodos(res.data)

    })
}


useEffect(()=>{

    getTodos()
},[])


const handleDelete=(id:number)=>{

    axios.delete(`http://localhost:8080/todos/${id}`)
    .then(getTodos)
}


const handleToggle=(id:number,status:boolean)=>{

    axios.patch(`http://localhost:8080/todos/${id}`,{status:status})
    .then(getTodos)
}

console.log(todos)

  return (
    <>
        <TodoInput handleAdd={handleClick}/>

        {todos.length>0 && todos.map((item)=>(
                 <TodoList key={item.id}{...item} 
                 handleDelete={handleDelete} 
                 onChange={handleToggle}
                 getTodos={getTodos}
                 />
        ))}
        
    </>
  )
}

export default Todo