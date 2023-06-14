import { customRender, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import ResetPassword from '../ResetPassword';
import { resetPasswordMock, resetPasswordMockError } from '@mocks/handlers/auth';
import { createBrowserHistory } from 'history';
import { createSearchParams } from 'react-router-dom';

describe('Reset Password Page', () => {
  beforeEach(() => {
    const url = `/reset-password?${createSearchParams({
      token: '1234567890'
    })}`;
    const history = createBrowserHistory();
    history.push(url);
  });

  // UNITARY TEST 1
  it('Should have password inputs', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

    // THEN
    expect(newPasswordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  // UNITARY TEST 2
  it('Button should be disabled', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');

    // THEN
    expect(buttonElement).toBeDisabled();
  });

  // UNITARY TEST 3
  it('Should have "Back to Login" text', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const spanElement = screen.getByText('Back to Login');

    // THEN
    expect(spanElement).toBeInTheDocument();
  });

  // UNITARY TEST 4
  it('Button should be enabled with inputs', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');

    // THEN
    expect(buttonElement).toBeEnabled();
  });

  // INTEGRATION TEST 1
  it('Button should change label when clicked', async () => {
    // GIVEN
    server.use(resetPasswordMock);
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');
    userEvent.click(buttonElement);
    const newButtonElement = screen.getByRole('button');

    // THEN
    expect(newButtonElement.textContent).toEqual('RESET PASSWORD IN PROGRESS...');
    await waitFor(() => {
      const newButtonElement1 = screen.getByRole('button');
      expect(newButtonElement1.textContent).toEqual('RESET PASSWORD');
    });
  });

  // INTEGRATION TEST 2
  describe('Errors', () => {
    // GIVEN
    it('Should display error alert and border for passwords dont match', async () => {
      // GIVEN
      server.use(resetPasswordMockError);
      customRender(<ResetPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(confirmPasswordLabel).toHaveStyle({ border: '2px inset' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Passwords do not match');
    });
  });

  // INTEGRATION TEST 3
  describe('Sucess', () => {
    // GIVEN
    it('Should display sucess alert for resetPassword updated', async () => {
      // GIVEN
      server.use(resetPasswordMock);
      customRender(<ResetPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'yordev');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password successfully updated.');
    });
  });
});
