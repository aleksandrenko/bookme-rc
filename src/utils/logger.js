import { createLogger, transports, format } from 'winston';
import moment from 'moment';

const customFormat = format.printf(info => {
  const duration = info.durationMs ? `duration: ${info.durationMs}ms` : '';
  const options = info.options
    ? `options: ${JSON.stringify(info.options)}`
    : '';
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

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [new transports.Console()]
});

export default logger;
