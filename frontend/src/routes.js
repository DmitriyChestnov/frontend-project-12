const apiPath = '/api/v1';

export default {
  login: () => [apiPath, 'login'].join('/'),
  signUp: () => [apiPath, 'signup'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  chatPage: () => '/',
  loginPage: () => '/login',
  signUpPage: () => '/signup',
};
