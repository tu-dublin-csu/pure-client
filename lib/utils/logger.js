import fs from 'fs';

/**
 * Creates a logger that writes to both console and file
 * @param {string} logFile - Path to the log file
 * @returns {Object} - Logger object with info, success, error, and debug methods
 */
export function createLogger(logFile) {
  return {
    info: (message) => {
      const formattedMessage = `[INFO] ${new Date().toISOString()} - ${message}`;
      console.log(message); // Original message for console (cleaner)
      fs.appendFileSync(logFile, formattedMessage + '\n');
    },
    success: (message) => {
      const formattedMessage = `[SUCCESS] ${new Date().toISOString()} - ${message}`;
      console.log(`✓ ${message}`); // Add checkmark for console
      fs.appendFileSync(logFile, formattedMessage + '\n');
    },
    error: (message, error) => {
      let formattedMessage = `[ERROR] ${new Date().toISOString()} - ${message}`;
      if (error) {
        formattedMessage += `\n${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`;
      }
      console.error(`✗ ${message}`); // Add X for console
      fs.appendFileSync(logFile, formattedMessage + '\n');
    },
    debug: (message, obj) => {
      let formattedMessage = `[DEBUG] ${new Date().toISOString()} - ${message}`;
      if (obj) {
        formattedMessage += `\n${JSON.stringify(obj, null, 2)}`;
      }
      console.log(message); // Original message for console
      fs.appendFileSync(logFile, formattedMessage + '\n');
    }
  };
}