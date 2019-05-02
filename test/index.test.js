const assert = require('assert')
const Pigeon = require('../src/index')
const Channel = require('../src/channel')

describe('pigeon test', () => {
  require('./channel/index.test.js')

  const pigeon = new Pigeon()
  it('addChannel param must be a Channel instance', () => {
    assert.throws(pigeon.addChannel.bind(pigeon))
    assert.throws(pigeon.addChannel.bind(pigeon, 123))
    assert.throws(pigeon.addChannel.bind(pigeon, true))
    assert.throws(pigeon.addChannel.bind(pigeon, {}))
  })
  it('addChannel instance must has name', () => {
    const channel = new Channel()
    assert.throws(pigeon.addChannel.bind(pigeon, channel))
    channel.name = null
    assert.throws(pigeon.addChannel.bind(pigeon, channel))
    channel.name = {}
    assert.throws(pigeon.addChannel.bind(pigeon, channel))
    channel.name = 'test'
    pigeon.addChannel(channel)
    assert.equal(pigeon.channels.test, channel)
    assert.throws(pigeon.addChannel.bind(pigeon, channel))
  })
})
