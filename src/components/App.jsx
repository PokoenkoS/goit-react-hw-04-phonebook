import React, { useEffect, useState } from "react";

import { nanoid } from 'nanoid'
import Form from "./Form";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { MainDiv } from "./Main.styled";

export const  App =()=>{
const [contacts,setContacts] = useState([]);
const [filter, setfilter] = useState('');


 useEffect(() => {
  const localContact = localStorage.getItem('contacts');
 if (localContact) setContacts( JSON.parse(contacts))
 
 }, []);

 useEffect(() => {
  contacts && localStorage.setItem('contacts',JSON.stringify(contacts) )
 
 
 }, []);

const formSubmitHendler = data => {
 
if (dublicateContact(data)) {
  return alert (`${data.name}: ${data.number} already in contacts` )
}
  const contact = {
    id: nanoid(),
    ...data
  }
  
  setContacts(prevState => ({
    contacts:[contact, ...prevState.contacts]
  }))
}

const dublicateContact = data => {
 return contacts.find(item => item.name ===data.name
   || item.number === data.number )
}

const changeFilter = e => { 
  return  setContacts({filter: e.currentTarget.value})

  
};
const getFilterContact =()=> {
  const normalizedFilter = contacts.filter.toLowerCase(); 
  return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter)
   || contact.number.toLowerCase().includes(normalizedFilter));
}

const deleteContact = (id) => {
  setContacts(prevState=>({
    contacts: prevState.contacts.filter(item=> item.id !== id)
  }))
}


  
    
    const visibleContact = getFilterContact();

    return (
      <MainDiv>
     <h1>Phonebook</h1>
     <Form onSubmit ={formSubmitHendler}/>
     <h2>Contacts</h2>
     <Filter value={filter} onChange={changeFilter}/>
     <ContactList contacts={visibleContact} onDeleteContact={deleteContact}/>
     </MainDiv>
    )
  }

