// src/components/CustomerRow/CustomerRow.tsx
import styles from './CustomerRow.module.css';
import type { Customer } from '../../types/customer';
import { Link } from 'react-router-dom';

interface Props {
  customer: Customer;
}

export function CustomerRow({ customer }: Props) {
  return (
    <tr className={styles.row}>
      <td className={styles.name}>
        <Link to={`/customers/${customer.CustomerID}`}>{customer.CompanyName}</Link>
      </td>
      <td className={styles.description}>{customer.Description}</td>
    </tr>
  );
}
