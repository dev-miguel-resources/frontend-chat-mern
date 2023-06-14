import { customRender, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import Button from '@molecules/button/Button';

describe('Button Component', () => {
  // UNITARY TEST 1
  it('Should be disabled', () => {
    // GIVEN
    customRender(<Button label="Send" disabled={true} className="button" />);

    // WHEN
    const buttonElement = screen.getByRole('button');

    // THEN
    expect(buttonElement).toBeDisabled();
  });

  // UNITARY TEST 2
  it('Should be enabled', () => {
    // GIVEN
    customRender(<Button label="Send" disabled={false} className="button" />);

    // WHEN
    const buttonElement = screen.getByRole('button');

    // THEN
    expect(buttonElement).toBeEnabled();
  });

  // UNITARY TEST 3
  it('Should have label', () => {
    // GIVEN
    customRender(<Button label="Send" className="button" />);

    // WHEN
    const buttonText = screen.getByText(/send/i);

    // THEN
    expect(buttonText).toBeInTheDocument();
  });

  // UNITARY TEST 4
  it('Should handle click event', () => {
    // GIVEN
    const onClick = jest.fn();
    customRender(<Button label="Send" className="button" disabled={false} handleClick={onClick} />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // THEN
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
