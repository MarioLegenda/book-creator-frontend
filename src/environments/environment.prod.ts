export const environment = {
  production: true,
  apiProtocol: 'https',
  apiUri: 'api.therebelsource.com',

  environmentProtocol: 'https',
  environmentUri: 'environment.therebelsource.com',

  staticProtocol: 'https',
  staticWeb: 'therebelsource.com',

  publicDir: 'images',

  composeBookApiBaseUrl(): string {
    return `${environment.apiProtocol}://${environment.apiUri}`;
  },

  composeEnvEmulatorUrl(): string {
    return `${environment.environmentProtocol}://${environment.environmentUri}`;
  },

  composeStaticWebUrl(): string {
    return `${environment.staticProtocol}://${environment.staticWeb}`;
  },
};

