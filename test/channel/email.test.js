const assert = require('assert')
const mock = require('../mock')
mock('nodemailer', () => {
    return {
        createTransport: function (object) {
            object.sendMail = function (options, callback) {
                callback('', options)
            }
            return object
        }
    }
})

const Email = require('../../src/channel/email')

describe('email channel test', () => {
    it('construstor test', () => {
        const testname = 'test name';
        const testhost = 'test host'
        const testauth = {user: '123', pass: '456'}
        const testOptions = {host: testhost, auth: testauth}
        const instance = new Email(testname, testOptions);
        assert.equal(instance.name, testname)
        assert.equal(instance.auth, testauth)
    });

    it('send message test', async () => {
        const sender = 'test sender'
        const receiver = 'test receiver'
        const subject = 'test subject'
        const text = 'test text'
        const mgs = {sender: sender, receiver: receiver, subject: subject, message: text}
        const instance = new Email('name', {host: 'host', auth: {user: 'user', pass: 'test pass'}})
        const res = await instance.sendMessage(mgs)

        assert.equal(res.form, sender)
        assert.equal(res.to, receiver)
        assert.equal(res.subject, subject)
        assert.equal(res.text, text)

    });
})