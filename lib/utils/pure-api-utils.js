import { PureClient } from '../../dist/index.js';

/**
 * Creates a Pure client instance
 * @param {string} url - Pure API URL
 * @param {string} apiKey - Pure API key
 * @returns {PureClient} - Pure client instance
 */
export function createPureClient(url, apiKey) {
  return new PureClient(url, apiKey);
}

/**
 * Creates pagination parameters for a Pure API request
 * @param {number} size - Batch size
 * @param {number} offset - Offset for pagination
 * @param {string[]} fields - Fields to include in the response
 * @returns {Object} - Parameters object for Pure API request
 */
export function createPaginationParams(size, offset, fields = []) {
  const params = { size, offset };
  if (fields.length > 0) {
    params.fields = fields.join(',');
  }
  return params;
}
