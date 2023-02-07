import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('use effect');
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    console.log('use effect change contacts');
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
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
      <Filter stateFilter={filter} onFilterChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
};
// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     // console.log(contacts);
//     if (contacts?.length) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('update');
//     const { contacts } = this.state;
//     // console.log(prevState.contacts);
//     if (prevState.contacts !== contacts) {
//       localStorage.setItem('my-contacts', JSON.stringify(contacts));
//     }
//   }

//   isDublicate(name) {
//     const result = this.state.contacts.find(contact => contact.name === name);
//     return Boolean(result);
//   }
//   addNewContact = ({ name, number }) => {
//     if (this.isDublicate(name)) {
//       alert(`${name} is already in contacts.`);
//       return false;
//     }
//     this.setState(prevState => {
//       const { contacts } = prevState;

//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };
//       return { contacts: [...contacts, newContact] };
//     });
//     return true;
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts() {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase().trim();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   }

//   render() {
//     return (
//       <>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addNewContact} />
//         <h2>Contacts</h2>
//         <Filter
//           stateFilter={this.state.filter}
//           onFilterChange={this.changeFilter}
//         />
//         <ContactList
//           contacts={this.getVisibleContacts()}
//           deleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }

export default App;
