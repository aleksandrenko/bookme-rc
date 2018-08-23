import { createLogger, format, transports } from 'winston';
import moment from 'moment';

const customFormat = format.printf(info => {
  const duration = info.durationMs ? `duration: ${info.durationMs}ms` : '';
  const options = info.options ? `options: ${JSON.stringify(info.options)}` : '';
  const error = info.error ? `error: ${info.error}` : '';
  const statusCode = info.statusCode ? `statusCode: ${info.statusCode}` : '';
  const message = info.message ? `message: ${info.message}` : '';

  return [
    moment().format(),
    info.level,
    message,
    duration,
    statusCode,
    error,
    options
  ].join(' ');
});

const YYYY_MM_DD = moment().format('YYYY_MM_DD');

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: `logs/${YYYY_MM_DD}_logs.log` }),
    new transports.File({ filename: `logs/${YYYY_MM_DD}_errors.log`, level: 'error' })
  ]
});

export default logger;