import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
