import styles from './BillingPeriodSelect.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function BillingPeriodSelect({ value, onChange }: Props) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All periods</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  );
}
