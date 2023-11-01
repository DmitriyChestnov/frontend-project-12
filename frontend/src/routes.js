const apiPath = 'api/v1';

export const appPaths = {
  login: '/login',
  chat: '/',
  signUp: '/signup',
};

export const apiRoutes = {
  login: () => [apiPath, 'login'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  signUp: () => [apiPath, 'signup'].join('/'),
};
