class Event {
  constructor(name, ctx) {
    this.__mock_data__ = void 0;
    this.name = name;
    this.ctx = ctx;
  }
  mock(data) {
    this.__mock_data__ = data || {};
  }
}

module.exports = Event;
