import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store/store';
import {
  getCustomers,
  setQuery,
  setBillingPeriod,
  setCurrentPage,
} from '../../features/customers/customerSlice';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { BillingPeriodSelect } from '../../components/BillingPeriodSelect/BillingPeriodSelect';
import { Pagination } from '../../components/Pagination/Pagination';
import { CustomerRow } from '../../components/CustomerRow/CustomerRow';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Home.module.css';

export function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    customers,
    loading,
    query,
    billingPeriod,
    currentPage,
    lastPage,
    total,
    from,
    to,
  } = useSelector((state: RootState) => state.customers);

  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    if (debouncedQuery !== query) {
      dispatch(setQuery(debouncedQuery));
    }
  }, [debouncedQuery, query, dispatch]);

  useEffect(() => {
    dispatch(getCustomers());
  }, [query, billingPeriod, currentPage, dispatch]);

  function handleSearchInputChange(value: string) {
    setLocalQuery(value);
  }

  function handleBillingPeriodChange(value: string) {
    dispatch(setBillingPeriod(value));
  }

  function handlePageChange(page: number) {
    dispatch(setCurrentPage(page));
  }

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <div className={styles.titleSearch}>
          <h2>Customer Directory</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <SearchInput value={localQuery} onChange={handleSearchInputChange} />
            <BillingPeriodSelect value={billingPeriod} onChange={handleBillingPeriodChange} />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : customers.length === 0 ? (
          <p className={styles.noResults}>No customers found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <CustomerRow key={customer.CustomerID} customer={customer} />
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          from={from}
          to={to}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
