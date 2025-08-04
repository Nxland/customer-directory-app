import styles from './CustomerDetailRow.module.css';

interface Props {
  label: string;
  value: React.ReactNode;
}

export function CustomerDetailRow({ label, value }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
