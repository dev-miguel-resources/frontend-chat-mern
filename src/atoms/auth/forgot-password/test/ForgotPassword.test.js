import { customRender, screen, waitFor } from '@root/test.utils';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import { forgotPasswordMock, forgotPasswordMockError } from '@mocks/handlers/auth';

describe('Forgot Password Page', () => {
  // UNITARY TEST 1
  it('Form should have email label', () => {
    // GIVEN
    customRender(<ForgotPassword />);

    // WHEN
    const emailLabel = screen.getByLabelText('Email');

    // THEN
    expect(emailLabel).toBeInTheDocument();
  });

  // UNITARY TEST 2
  it('Should have "Back to Login" text', () => {
    // GIVEN
    customRender(<ForgotPassword />);

    // WHEN
    const spanElement = screen.getByText('Back to Login');

    // THEN
    expect(spanElement).toBeInTheDocument();
  });

  // UNITARY TEST 3
  describe('Button', () => {
    // GIVEN
    it('Button should be disabled', () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');

      // THEN
      expect(buttonElement).toBeInTheDocument();
    });

    // UNITARY TEST 4
    it('Should be enabled with input', () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');

      // THEN
      expect(buttonElement).toBeEnabled();
    });

    // UNITARY TEST 5
    it('Should change label when clicked', async () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');
      userEvent.click(buttonElement);

      // THEN
      const newButtonElement = screen.getByRole('button');
      expect(newButtonElement.textContent).toEqual('FORGOT PASSWORD IN PROGRESS...');

      await waitFor(() => {
        const newButtonElement1 = screen.getByRole('button');
        expect(newButtonElement1.textContent).toEqual('FORGOT PASSWORD');
      });
    });
  });

  describe('Errors', () => {
    // INTEGRATION TEST 1
    it('Should display error alert and border of invalid email', async () => {
      // GIVEN
      server.use(forgotPasswordMockError);
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Email must be valid');
    });
  });

  describe('Success', () => {
    // INTEGRATION TEST 1
    it('Should display sucess alert', async () => {
      // GIVEN
      server.use(forgotPasswordMock);
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito@gmail.com');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password reset email sent.');
    });
  });
});
