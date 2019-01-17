import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: false,
  name: 'dev',
  serverLoggingUrl: 'http://54.161.9.34:5000/api/clientsidelog',
  calculateUrl: 'http://54.161.9.34:5000/api/calculate',
  loglevel: NgxLoggerLevel.DEBUG,
  serverLoglevel: NgxLoggerLevel.WARN,
  disableAnimations: false,
  e2eTest: false
};
