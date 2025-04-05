import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
}