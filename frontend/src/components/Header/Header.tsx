import styles from './Header.module.css';
import logo from '../../assets/ai-toolbox-logo.png';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="AI Toolbox" className={styles.logo} />
    </header>
  );
}
