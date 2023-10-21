const apiPath = '/api/v1/';

export default {
  getLogin: () => [apiPath, 'login'].join(''),
  getSignUp: () => [apiPath, 'signup'].join(''),
  getData: () => [apiPath, 'data'].join(''),
  chatPage: '/',
  loginPage: '/login',
  signupPage: '/signup',
};
