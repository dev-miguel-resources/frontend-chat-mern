import reducer, { addUser, clearUser, updateUserProfile } from '../user.reducer';
import { initialStateUserMock } from './mock/initialState.mock';

describe('User Reducer', () => {
  beforeEach(() => {
    initialStateUserMock.token = '';
    initialStateUserMock.profile = null;
  });

  // UNITARY TEST 1
  it('Should return the initial state', () => {
    // THEN
    expect(reducer(undefined, {})).toEqual({ token: '', profile: null });
  });

  // UNITARY TEST 2
  it('Should add user with token and profile', () => {
    // THEN
    expect(reducer(initialStateUserMock, addUser({ token: '1234', profile: { username: 'yorman' } }))).toEqual({
      token: '1234',
      profile: { username: 'yorman' }
    });
  });

  // UNITARY TEST 3
  it('Should update user profile', () => {
    // GIVEN
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'yorman' };
    // THEN
    expect(reducer(initialStateUserMock, updateUserProfile({ username: 'Joseph' }))).toEqual({
      token: '123456',
      profile: { username: 'Joseph' }
    });
  });

  // UNITARY TEST 4
  it('Should reset profile and token', () => {
    // GIVEN
    initialStateUserMock.token = '123456';
    initialStateUserMock.profile = { username: 'Joseph' };
    // THEN
    expect(reducer(initialStateUserMock, clearUser())).toEqual({
      token: '',
      profile: null
    });
  });
});
