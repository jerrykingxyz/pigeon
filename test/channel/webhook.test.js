const assert = require('assert');
const Webhook = require('../../src/channel/webhook');

describe('webhook channel test', () => {
  it('constructor test', () => {
    const testName = 'test name';
    const testOptions = {};
    const instance = new Webhook(testName, testOptions);
    assert.equal(instance.name, testName);
    assert.equal(instance.options, testOptions);
  });
});
