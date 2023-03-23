import React, { useEffect, useState } from "react";

import { nanoid } from 'nanoid'
import Form from "./Form";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { MainDiv } from "./Main.styled";

export const  App =()=>{
const [contacts,setContacts] = useState(() => {
  const value = JSON.parse(localStorage.getItem("contacts"));
  return value ?? [];
});
const [filter, setFilter] = useState('');


 useEffect(() => {
  const localContact = localStorage.getItem('contacts');
 if (localContact) setContacts( JSON.parse(localContact))
 
 }, []);

 useEffect(() => {
  contacts && localStorage.setItem('contacts',JSON.stringify(contacts) )
 
 
 }, [contacts]);

const formSubmitHendler = data => {
 
if (dublicateContact(data)) {
  return alert (`${data.name}: ${data.number} already in contacts` )
}
  const contact = {
    id: nanoid(),
    ...data
  }
  
  setContacts((prev) => [contact, ...prev])
  console.log(contacts);
}

const dublicateContact = data => {
 return contacts.find(item => item.name ===data.name
   || item.number === data.number )
}

const changeFilter = e => { 
  return  setFilter({filter: e.currentTarget.value})

  
};
const getFilterContact =()=> {
  console.log(contacts);
  const normalizedFilter = filter.toLowerCase(); 
  const filterContacts= contacts.filter(({ name, number }) => {
    const normalizedName = name.toLocaleLowerCase()
    const normalizedNumber = number.toLocaleLowerCase()
    const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
    return result;
    
  })
  return filterContacts
  
}

const deleteContact = (id) => {
  setContacts((prev)=>{
   const newContacts = prev.filter((item) => item.id !== id)
   return newContacts
  })
}

    return (
      <MainDiv>
     <h1>Phonebook</h1>
     <Form onSubmit ={formSubmitHendler}/>
     <h2>Contacts</h2>
     <Filter value={filter} onChange={changeFilter}/>
     <ContactList items={getFilterContact()} onDeleteContact={deleteContact}/>
     </MainDiv>
    )
  }

