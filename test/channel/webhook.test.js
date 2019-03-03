const mock = require('../mock');
mock('node-fetch', () => {
  return async function(url, options) {
    return { url, options };
  };
});
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

  it('send message test', async () => {
    const url = 'test url';
    const headers = { token: 'token message' };
    const msg = { username: 'root', password: 'test password' };
    const instance = new Webhook('name', { url, headers });
    const res = await instance.sendMessage(msg);
    assert.equal(res.url, url);
    assert.equal(res.options.method, 'POST');
    assert.equal(res.options.headers, headers);
    assert.equal(res.options.body, JSON.stringify(msg));
  });
});
