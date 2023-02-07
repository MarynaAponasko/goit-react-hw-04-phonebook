import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // console.log('use effect');
    const contacts = JSON.parse(window.localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    // console.log('use effect change contacts');
    window.localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const result = contacts.find(contact => contact.name === name);
    return Boolean(result);
  };

  const addNewContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts.`);
      return false;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, newContact]);
    return true;
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter stateFilter={filter} onFilterChange={() => changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
};

export default App;
