import axios from 'axios';
import React, { useState } from 'react'


interface ITodoList {
  title:string;
  status:boolean;
  id:number;
  handleDelete:(value:number)=>void
  onChange:(id:number,status:boolean)=>void
  getTodos: () => void;
}

const TodoList = ({id,title,status,handleDelete,onChange,getTodos}:ITodoList) => {
    console.log(title)

    const [value, setValue] = useState("");
    const [toggle,setToggle]=useState(false)


const handleDelete1=(id:number)=>{

    handleDelete(id)
}


const handleToggleChange:React.ChangeEventHandler<HTMLInputElement>=(e)=>{
console.log(e.target.checked)  //true or false
  onChange(id,e.target.checked)
}





const openDialog = () => {
  let myModal: any = document.querySelector(".myDialog");
  myModal.showModal();
  localStorage.setItem("currentTodo", JSON.stringify(id));
};

const updateandCloseDialog = () => {
  let myModal: any = document.querySelector(".myDialog");
  myModal.close();
  let currentID = JSON.parse(`${localStorage.getItem("currentTodo")}`);

  if (value) {
    axios
      .patch(`http://localhost:8080/todos/${currentID}`, { title: value })
      .then(getTodos);
  }
  setValue("");
};

const cancelDialog = () => {
  let myModal: any = document.querySelector(".myDialog");
  myModal.close();
  setValue("");
};

const handleT=()=>{
  setToggle(!toggle)
}

  return (
    <div>
      <div className='flex'>

      <input type="checkbox"  onChange={handleToggleChange}/>
     
     <span>{title}</span>
     <span>{`status:${toggle}`}</span>
     <button onClick={handleT}>Toggle</button>
     <button onClick={()=>handleDelete1(id)}> × </button>
    

     <button onClick={openDialog}>Edit</button>
      </div>
      
      <dialog
        className="myDialog"
        style={{ height: 200, width: 300, border: "1px solid black" }}
      >
        <h3>Edit your Todo</h3>
        <input className='dialoginput'
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
        <br />
        <button className='update' onClick={updateandCloseDialog}>UPDATE</button>
        <button className='cancel' onClick={cancelDialog}>CANCEL</button>
      </dialog>
      
    </div>
  )
}

export default TodoList