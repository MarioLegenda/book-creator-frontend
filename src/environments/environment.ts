// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiProtocol: 'https',
  apiUri: '11.11.11.12',

  environmentProtocol: 'https',
  environmentUri: '11.11.11.12',

  staticProtocol: 'https',
  staticWeb: '11.11.11.12',

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
