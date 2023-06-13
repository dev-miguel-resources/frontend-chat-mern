import { customRender, screen, within, fireEvent } from '@root/test.utils';
import AuthTabs from '../AuthTabs';

describe('AuthTabs', () => {
  // UNITARY TEST 1
  it('Sign In tab should be displayed', () => {
    // GIVEN
    customRender(<AuthTabs />);

    // WHEN
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');

    // THEN
    expect(items[0]).toHaveTextContent('Sign In');
    expect(items[0]).toHaveClass('active');
  });

  // UNITARY TEST 2
  it('Sign up tab should be displayed', () => {
    // GIVEN
    customRender(<AuthTabs />);

    // WHEN
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    fireEvent.click(items[1]);

    // THEN
    expect(items[1]).toHaveTextContent('Sign Up');
    expect(items[1]).toHaveClass('active');
  });
});
