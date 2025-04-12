// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build  --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  name: 'dev',
  // serverLoggingUrl: 'http://localhost:5000/api/clientsidelog',
  // calculateUrl: 'http://localhost:5000/api/calculate',
  serverLoggingUrl: 'https://glimmpse.samplesizeshop.org/api/clientsidelog',
  calculateUrl: 'https://glimmpse.samplesizeshop.org/api/calculate',
  loglevel: NgxLoggerLevel.DEBUG,
  serverLoglevel: NgxLoggerLevel.WARN,
  disableAnimations: false,
  e2eTest: false,
};
