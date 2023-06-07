import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'User created succesfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signUpMockError = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Invalid Credentials' };
  return res(ctx.status(400), ctx.json(result));
});

export const authHandlers = [signUpMock, signUpMockError];
