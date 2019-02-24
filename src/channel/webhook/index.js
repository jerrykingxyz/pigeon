const fetch = require('node-fetch');
const Channel = require('../index');

/**
 * webhook channel
 */
class Webhook extends Channel {
  /**
   * @constructor
   * @param {string} name - webhook channnel instance name
   * @param {Object} options - channel options
   * @param {string} options.url - http url
   * @param {Object} options.headers - http headers
   */
  constructor(name, options) {
    super(options);
    this.name = name;
  }

  /**
   * @param {Object} body - http body
   */
  sendMessage(body) {
    const { url, headers } = this.options;
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
  }
}

module.exports = Webhook;
