const assert = require('assert')
const Email = require('../../src/channel/email')

describe('email channel test', () => {
    it('construstor test', () => {
        const testname = 'test name';
        const testOptions = {}
        const instance = new Email(testname,testOptions);
        assert.equal(instance.name, testname )
        assert.equal(instance.options, testOptions)
    });
})