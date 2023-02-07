import { useState } from 'react';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';
import { nanoid } from 'nanoid';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChangeState = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const labelNameId = nanoid();
  const labelNumberId = nanoid();

  const reset = () => {
    setName('');
    setNumber('');
    return;
  };

  const handlerSubmit = e => {
    e.preventDefault();
    const resultSubmit = onSubmit({ name, number });
    if (resultSubmit) {
      reset();
    }
  };

  return (
    <form onSubmit={handlerSubmit} className={s.form}>
      <label htmlFor={labelNameId} className={s.label}>
        Name
      </label>
      <input
        id={labelNameId}
        className={s.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handlerChangeState}
      />
      <label htmlFor={labelNumberId} className={s.label}>
        Number
      </label>
      <input
        id={labelNumberId}
        className={s.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handlerChangeState}
      />

      <button type="submit" className={s.formButton}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
