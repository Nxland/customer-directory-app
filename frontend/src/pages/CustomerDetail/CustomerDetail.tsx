import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerById } from '../../features/customers/customerDetailSlice';
import type { RootState, AppDispatch } from '../../store/store';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { CustomerDetailRow } from '../../components/CustomerDetailRow/CustomerDetailRow';
import styles from './CustomerDetail.module.css';
import { useFormattedCurrency } from '../../hooks/useFormattedCurrency';

export function CustomerDetail() {
  const { id } = useParams();
  const customerId = Number(id);
  const dispatch = useDispatch<AppDispatch>();

  const customer = useSelector(
    (state: RootState) => state.customerDetail.customerById[customerId]
  );
  const loading = useSelector((state: RootState) => state.customerDetail.loading);

  useEffect(() => {
    if (!customer) {
      dispatch(getCustomerById(customerId));
    }
  }, [dispatch, customerId, customer]);

  if (loading || !customer) return <LoadingSpinner />;

  const formattedCost = useFormattedCurrency(customer.subscription_cost);

  return (
    <div className={styles.container}>
      <h2>{customer.company_name}</h2>
      <Link to="/">&lt;&lt; Back to Customer Directory</Link>

      <div className={styles.card}>
        <CustomerDetailRow
          label="Product description:"
          value={<span className={styles.highlight}>{customer.description}</span>}
        />
        <CustomerDetailRow
          label="Website:"
          value={
            <a href={customer.website} target="_blank" rel="noreferrer">
              {customer.website}
            </a>
          }
        />
        <CustomerDetailRow
          label="Subscription Cost:"
          value={`${formattedCost} ${customer.billing_period}`}
        />
        <CustomerDetailRow
          label="Address:"
          value={customer.address?.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        />
      </div>
    </div>
  );
}
