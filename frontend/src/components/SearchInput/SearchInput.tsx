// components/SearchInput/SearchInput.tsx
import { FaSearch } from 'react-icons/fa';
import styles from './SearchInput.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <FaSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
