const Channel = require('./channel');

class Pigeon {
  constructor() {
    this.channelInstance = {};
  }

  addChannel(instance) {
    if (!(instance instanceof Channel)) {
      throw new Error('add channel failed, you must input a channel instance.');
    }
    
    const { name } = instance;
    if (!name || typeof name !== 'string') {
      throw new Error('channel name must be a string');
    }
    if (this.channelInstance[name]) {
      throw new Error(`[${name}] channel already exists`);
    }
    
    this.channelInstance[name] = instance;
  }

  async send(letter) {
    const channel = this.channelInstance[letter.channel];
    if (!channel) {
      throw new Error('channel not exist');
    }
    return channel.sendMessage(letter.msg);
  }
}

module.exports = Pigeon;
