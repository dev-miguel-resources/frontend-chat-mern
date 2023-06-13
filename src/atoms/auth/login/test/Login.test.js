import { signInMock, signInMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import Login from '@atoms/auth/login/Login';
import { fireEvent, screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('SignIn', () => {
  // UNITARY TEST 1
  it('Signin form should have its labels', () => {
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
  it('Checkbox should be unchecked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxElement = screen.getByLabelText(/Keep me signed in/i);

    // THEN
    expect(checkBoxElement).not.toBeChecked();
  });

  // UNITARY TEST 3
  it('Checkbox should be checked when clicked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxElement = screen.getByLabelText('Keep me signed in');
    expect(checkBoxElement).not.toBeChecked();

    // THEN
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement).toBeChecked();
  });

  // UNITARY TEST 3
  describe('Button', () => {
    it('Should be disabled', () => {
      // GIVEN
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');

      // THEN
      expect(buttonElement).toBeDisabled();
    });

    // UNITARY TEST 4
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

  // INTEGRATION TEST 2 PENDING
  describe('Error', () => {
    it('should display error alert and border', async () => {
      // GIVEN
      server.use(signInMockError);
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yor');
      userEvent.type(passwordElement, 'yorman');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Invalid credentials');

      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });
  });

  // INTEGRATION TEST 3
  describe('Success', () => {
    it('should navigate to streams page', async () => {
      // GIVEN
      server.use(signInMock);
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');
      userEvent.click(buttonElement);

      // THEN
      await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/app/social/streams'));
    });
  });
});
