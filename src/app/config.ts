interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

export const config: Config = {
  authUrl: '/api/auth',
  auth: 'session'
};
