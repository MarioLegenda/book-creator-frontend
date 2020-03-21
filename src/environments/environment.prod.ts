export const environment = {
  production: true,
  protocol: 'https',
  bookApiUri: 'therebelsource.com',

  rebelCdnApiUri: 'therebelsource.com',

  envEmulatorUri: 'therebelsource.com',

  staticWeb: 'therebelsource.com',

  publicDir: 'images',

  composeBookApiBaseUrl(): string {
    return `${environment.protocol}://${environment.bookApiUri}`;
  },

  composeEnvEmulatorUrl(): string {
    return `${environment.protocol}://${environment.envEmulatorUri}`;
  },

  composeRebelCdnUrl(): string {
    return `${environment.protocol}://${environment.rebelCdnApiUri}`;
  },

  composeStaticWebUrl(): string {
    return `${environment.protocol}://${environment.staticWeb}`;
  },
};
