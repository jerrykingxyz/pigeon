class Channel {
  /**
   * @constructor
   * @param { string} name - channel instance name
   */
  constructor(name) {
    this.name = name;
  }

  // eslint-disable-next-line
  async sendMessage(msg) {
    return;
  }
}

module.exports = Channel;
