import React from "react";
import { useState } from "react";
import { nanoid } from 'nanoid'
import { Button, FormDiv, FormLabel } from "./Main.styled";

const initialState = {
  contacts: [],
        name: '',
        number: ''
}

 const Form =({onSubmit})=>{
  const [state, setState] = useState(initialState);

const name = nanoid();
const number = nanoid();

const handeleChange = e => {
  const {name, value} = e.target
  setState((prev) => {
     return{
      ...prev,
    [name]: value

     }
  })
 };

 const handeleSubmite = (e) =>{
    e.preventDefault();

    const { name, number} = state;
    onSubmit({name, number});
    
   setState(initialState)
  }

    return(
        <FormDiv onSubmit={handeleSubmite}
        >
        <FormLabel>Name
       <input
       type="text"
       name="name"
       id={name}
       value={state.name}
       onChange={handeleChange}
       pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
       title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
       required
     /> 
     </FormLabel>
     <FormLabel> Number
         <input
       type="tel"
       name="number"
       id={number}
       value={state.number}
       onChange={handeleChange}
       pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
       title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
       required
       /></FormLabel>
     <Button type="submit">Add contact</Button>  
      
       </FormDiv>
       
    
)
}


export default Form;