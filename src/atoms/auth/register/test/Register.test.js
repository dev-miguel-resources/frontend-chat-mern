import { screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Register from '@atoms/auth/register/Register';
import { server } from '@mocks/server';
import { UtilsService } from '@services/utils/utils.service';
import { signUpMockError } from '@mocks/handlers/auth';

describe('Register Page', () => {
  // UNITARY TEST 1
  it('Signup form should have its labels', () => {
    // GIVEN
    customRender(<Register />);

    // WHEN
    const usernameLabel = screen.getByLabelText('Username');
    const emailLabel = screen.getByLabelText('Email');
    const passwordLabel = screen.getByLabelText('Password');

    // THEN
    expect(usernameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  describe('Button Element', () => {
    // UNITARY TEST 2
    it('Should be disabled', () => {
      // GIVEN
      customRender(<Register />);

      // WHEN
      const buttonElement = screen.getByRole('button');

      // THEN
      expect(buttonElement).toBeDisabled();
    });

    it('Button should be enabled with input values', () => {
      // UNITARY TEST 3
      // GIVEN
      customRender(<Register />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'yorman');
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

      // THEN
      expect(buttonElement).toBeEnabled();
    });

    it('Should change label when clicked button', async () => {
      // INTEGRATION TEST 1
      // GIVEN
      customRender(<Register />);
      jest.spyOn(UtilsService, 'avatarColor');
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'yorman');
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

      await act(() => {
        userEvent.click(buttonElement);
      });

      // THEN
      await waitFor(() => {
        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGN UP IN PROGRESS...');
      });
    });
  });

  describe('Error response with Invalid Credentials', () => {
    // INTEGRATION TEST 2
    it('Should display error alert and border', async () => {
      // GIVEN
      server.use(signUpMockError);

      // WHEN
      jest.spyOn(UtilsService, 'avatarColor');
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
      customRender(<Register />);
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const emailElement = screen.getByLabelText('Email');
      const passwordElement = screen.getByLabelText('Password');

      userEvent.type(usernameElement, 'gab');
      userEvent.type(emailElement, 'gab.com');
      userEvent.type(passwordElement, 'gab');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Invalid Credentials');
      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });
  });
});
