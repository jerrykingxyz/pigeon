const Channel = require('./channel');
const Plugin = require('./plugin');
const Event = require('./event');

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

  addPlugin(plugin) {
    if (!(plugin instanceof Plugin)) {
      throw new Error('add plugin failed, you must input a plugin instance.');
    }

    plugin.main(this);
  }

  async send(letter) {
    if (typeof letter !== 'object') {
      throw new Error('letter must be a object');
    }

    const event = await this.emit(new Event('beforeSend', letter));
    // mock data
    if (event.__mock_data__) {
      return event.__mock_data__;
    }

    letter = event.ctx;
    const channel = this.channels[letter.channel];
    if (!channel) {
      throw new Error('channel not exist');
    }

    const res = await channel.sendMessage(letter.msg);
    return this.emit(new Event('afterSend', res));
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

  async emit(event) {
    if (!(event instanceof Event)) {
      return;
    }

    const list = this.events[event.name];
    if (!Array.isArray(list)) {
      return;
    }

    for (const callback of list) {
      await callback(event);
      if (event.__mock_data__) {
        break;
      }
    }
    return event;
  }
}

module.exports = Pigeon;
