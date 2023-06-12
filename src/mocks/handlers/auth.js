import { rest } from 'msw';
import { existingUser, userJwt } from '@mocks/data/user.mock';
import { BASE_ENDPOINT } from '@services/axios';

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export const signUpMock = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'User created succesfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signUpMockErrorEmailNotValid = rest.post(`${BASE_URL}/signup`, (_req, res, ctx) => {
  const result = { message: 'Email must be valid' };
  return res(ctx.status(400), ctx.json(result));
});

export const signInMock = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'User login succesfully', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const signInMockError = rest.post(`${BASE_URL}/signin`, (_req, res, ctx) => {
  const result = { message: 'Invalid credentials', user: existingUser, token: userJwt };
  return res(ctx.json(result));
});

export const authHandlers = [signUpMock, signUpMockErrorEmailNotValid, signInMock, signInMockError];
