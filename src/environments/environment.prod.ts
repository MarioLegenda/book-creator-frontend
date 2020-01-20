export const environment = {
  production: true,
  protocol: 'http',
  bookApiUri: '11.11.11.12',
  bookApiPort:80,

  envEmulatorUri: '11.11.11.12',
  envEmulatorPort: 80,

  rebelCdnApiUri: '11.11.11.12',
  rebelCdnApiPort: 80,

  composeBookApiBaseUrl(): string {
    return `${environment.protocol}://${environment.bookApiUri}:${environment.bookApiPort}`;
  },

  composeEnvEmulatorUrl(): string {
    return `${environment.protocol}://${environment.envEmulatorUri}:${environment.envEmulatorPort}`;
  },

  composeRebelCdnUrl(): string {
    return `${environment.protocol}://${environment.rebelCdnApiUri}:${environment.rebelCdnApiPort}`;
  },
};
