import React, { useState } from 'react'

interface ITodoInput{
    handleAdd:(value:string)=>void
}

const TodoInput = ({handleAdd}:ITodoInput) => {

    const [text,setText]=useState<string>("")

const handleChange:React.ChangeEventHandler<HTMLInputElement>=(e)=>{

    setText(e.target.value)
}

const handleClick=()=>{

    if(text===""){
        return
    }
    else{
         handleAdd(text)
    }
   

}

  return (
    <div >
        <input className='input'
        type="text" 
        value={text}
        onChange={handleChange}

        />
        <button className='btn' onClick={handleClick}>Add</button>
    </div>
  )
}

export default TodoInput