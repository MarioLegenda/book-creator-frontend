// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
