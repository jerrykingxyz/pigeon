class Channel {
  constructor(options) {
    this.options = options;
  }

  get name() {
    return null;
  }
  // eslint-disable-next-line
  async sendMessage(msg) {
    return;
  }
}

module.exports = Channel;
