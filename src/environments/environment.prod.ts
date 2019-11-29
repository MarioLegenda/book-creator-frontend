export const environment = {
  production: true,
  protocol: 'http',
  baseUrl: '11.11.11.12',
  port:80,

  composeBaseUrl(): string {
    return `${environment.protocol}://${environment.baseUrl}:${environment.port}`;
  }
};
