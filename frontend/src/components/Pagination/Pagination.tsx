import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  lastPage,
  total,
  from,
  to,
  onPageChange,
}: Props) {
  const getVisiblePages = () => {
    const pages = [];

    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(start + 4, lastPage);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        )}

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? styles.active : ''}
          >
            {page}
          </button>
        ))}

        {currentPage < lastPage && (
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        )}
      </div>

      <div className={styles.pageInfo}>
        {from}–{to} of {total}
      </div>
    </div>
  );
}
