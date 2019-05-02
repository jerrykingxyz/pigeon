const Plugin = require('./index')

class LogPlugin extends Plugin {
  handleSend(event) {
    // eslint-disable-next-line
    console.log(JSON.stringify(event.ctx))
  }
  main(pigeon) {
    pigeon.on('beforeSend', this.handleSend)
    pigeon.on('afterSend', this.handleSend)
  }
}

module.exports = LogPlugin
