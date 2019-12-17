// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build  --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  name: 'dev',
  // serverLoggingUrl: 'https://localhost:5000/api/clientsidelog',
  // calculateUrl: 'https://localhost:5000/api/calculate',
  serverLoggingUrl: 'https://54.161.9.34:5000/api/clientsidelog',
  calculateUrl: 'https://54.161.9.34/api/calculate',
  loglevel: NgxLoggerLevel.DEBUG,
  serverLoglevel: NgxLoggerLevel.WARN,
  disableAnimations: false,
  e2eTest: false,
};
