class Channel {
  get name() {
    return null;
  }
  
  constructor(options) {
    this.options = options;
  }

  // eslint-disable-next-line
  async sendMessage(msg) {
    return;
  }
}

module.exports = Channel;
