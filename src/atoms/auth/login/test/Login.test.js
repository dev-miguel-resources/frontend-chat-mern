import { customRender, fireEvent, screen, act, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import Login from '@atoms/auth/login/Login';
import { signInMock, signInMockError } from '@mocks/handlers/auth';
import { UtilsService } from '@services/utils/utils.service';

describe('Sign In Page', () => {
  // UNITARY TEST 1
  it('Sign In form should have its labels', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const usernameLabel = screen.getByLabelText('Username');
    const passwordLabel = screen.getByLabelText('Password');
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    // THEN
    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(checkBoxLabel).toBeInTheDocument();
  });

  // UNITARY TEST 2
  it('CheckBox should be unchecked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    // THEN
    expect(checkBoxLabel).not.toBeChecked();
  });

  // UNITARY TEST 3
  it('CheckBox should be checked when clicked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    // THEN
    expect(checkBoxLabel).not.toBeChecked();
    fireEvent.click(checkBoxLabel);
    expect(checkBoxLabel).toBeChecked();
  });

  describe('Button', () => {
    // UNITARY TEST 4
    it('Should be disabled', () => {
      // GIVEN
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');

      // THEN
      expect(buttonElement).toBeDisabled();
    });

    // UNITARY TEST 5
    it('Should be enabled with inputs', () => {
      // GIVEN
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      fireEvent.change(usernameElement, { target: { value: 'yorman' } });
      fireEvent.change(passwordElement, { target: { value: 'yordev' } });

      // THEN
      expect(buttonElement).toBeEnabled();
    });

    // INTEGRATION TEST 1
    it('Should change label when clicked', async () => {
      // GIVEN
      server.use(signInMock);
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');

      await act(() => {
        userEvent.click(buttonElement);
      });

      // THEN
      await waitFor(() => {
        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGNIN IN PROGRESS...');
      });
    });
  });

  // PENDING
  describe('Error response with Invalid Credentials', () => {
    // INTEGRATION TEST 2
    it('Should display error alert and border', async () => {
      // GIVEN
      server.use(signInMockError);

      // WHEN
      jest.spyOn(UtilsService, 'avatarColor');
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
      customRender(<Login />);
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');

      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Invalid Credentials');
      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });
  });
});
