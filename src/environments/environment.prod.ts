export const environment = {
  production: true,
  protocol: 'http',
  baseUrl: '11.11.11.12',
  port: 8080,

  composeBaseUrl(): string {
    return `${environment.protocol}://${environment.baseUrl}:${environment.port}`;
  }
};
