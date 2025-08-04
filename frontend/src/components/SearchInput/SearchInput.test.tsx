import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders input with initial value', () => {
    render(<SearchInput value="test" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalled();
  });
});
