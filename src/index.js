const Channel = require('./channel');

class Pigeon {
  constructor() {
    this.channels = {};
    this.events = {};
  }

  addChannel(instance) {
    if (!(instance instanceof Channel)) {
      throw new Error('add channel failed, you must input a channel instance.');
    }
    
    const { name } = instance;
    if (!name || typeof name !== 'string') {
      throw new Error('channel name must be a string');
    }
    if (this.channels[name]) {
      throw new Error(`[${name}] channel already exists`);
    }
    
    this.channels[name] = instance;
  }

  async send(letter) {
    if (typeof letter !== 'object') {
      throw new Error('letter must be a object');
    }

    const channel = this.channels[letter.channel];
    if (!channel) {
      throw new Error('channel not exist');
    }

    return channel.sendMessage(letter.msg);
  }

  on(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw new Error('event name must be string');
    }
    if (typeof callback !== 'function') {
      throw new Error('event callback must be a function');
    }

    if (!Array.isArray(this.events[eventName])) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw new Error('event name must be string');
    }

    if (typeof callback === 'undefined') {
      delete this.events[eventName];
      return;
    }
    const events = this.events[eventName];
    if (!Array.isArray(events)) {
      return;
    }
    const index = events.indexOf(callback);
    if (index !== -1) {
      events.splice(index, 1);
    }
  }

  emit(eventName) {
    if (typeof eventName !== 'string') {
      throw new Error('event name must be string');
    }

    const events = this.events[eventName];
    if (!Array.isArray(events)) {
      return;
    }
    events.forEach(e => e());
  }
}

module.exports = Pigeon;
