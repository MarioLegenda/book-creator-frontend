export const environment = {
  production: true,
  protocol: 'https',
  bookApiUri: '11.11.11.12',
  bookApiPort:80,

  rebelCdnApiUri: '11.11.11.12',
  rebelCdnApiPort: 80,

  envEmulatorUri: '11.11.11.12',
  envEmulatorPort: 80,

  staticWeb: '11.11.11.12',
  staticWebPort: 80,

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

