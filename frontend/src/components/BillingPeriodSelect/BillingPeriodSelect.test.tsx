import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BillingPeriodSelect } from './BillingPeriodSelect';

describe('BillingPeriodSelect', () => {
  it('renders select with options', () => {
    render(<BillingPeriodSelect value="" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('All periods')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('calls onChange when selecting an option', async () => {
    const handleChange = vi.fn();
    render(<BillingPeriodSelect value="" onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'monthly');
    expect(handleChange).toHaveBeenCalledWith('monthly');
  });
});
