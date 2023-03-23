import React from "react";
import PropTypes from 'prop-types'

const ContactList =({items, onDeleteContact})=> {
return(
    <div>
    
    <ul>
    {items.map((contact) =>{return (
    <li key={contact.id}>
    {contact.name}:{contact.number}
    <button type="submit" onClick={()=>onDeleteContact(contact.id)}> Delete</button>
    </li>
    )
    })}
    </ul>
  </div> 
)
};
ContactList.propTypes = {
  contacts: PropTypes.array,
}

export default ContactList;
  
