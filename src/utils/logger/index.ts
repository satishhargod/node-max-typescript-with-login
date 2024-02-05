import { createLogger, format, transports } from 'winston'
import WinstonDaily from 'winston-daily-rotate-file'
const { combine, json, metadata, label, timestamp, colorize, splat, simple, printf } = format

// Log File Format
const logFileFormat = combine(label({ label: 'server' }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json())
// Console Format
const consoleFormat = combine(
  colorize(),
  splat(),
  simple(),
  printf(({ level, message, timestamp, label }) => `${timestamp} ${level} [${label}]: ${message}`),
)

// Transports
const debugTransport: WinstonDaily = new WinstonDaily({
  level: 'debug',
  filename: '%DATE%.log',
  dirname: 'log/debug',
  datePattern: 'YYYY-MM-DD',
  extension: '',
  maxFiles: '30d', // For 30Day Saved
  json: false,
  zippedArchive: true,
})

const errorTransport: WinstonDaily = new WinstonDaily({
  level: 'error',
  filename: '%DATE%.log',
  dirname: 'log/error',
  datePattern: 'YYYY-MM-DD',
  extension: '',
  maxFiles: '30d', // For 30Day Saved
  json: false,
  zippedArchive: true,
})

// Store Data Format
export const logger = createLogger({
  level: 'error',
  format: logFileFormat,
  transports: [debugTransport, errorTransport],
})

logger.add(
  new transports.Console({
    format: consoleFormat,
  }),
)
