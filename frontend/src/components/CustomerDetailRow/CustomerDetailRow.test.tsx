import { render, screen } from '@testing-library/react';
import { CustomerDetailRow } from './CustomerDetailRow';

describe('CustomerDetailRow', () => {
  it('renders label and value', () => {
    render(
      <CustomerDetailRow
        label="Subscription Cost:"
        value="$100 monthly"
      />
    );
    expect(screen.getByText('Subscription Cost:')).toBeInTheDocument();
    expect(screen.getByText('$100 monthly')).toBeInTheDocument();
  });
});
