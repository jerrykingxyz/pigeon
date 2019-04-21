const Module = require('module')
const _require = Module.prototype.require
const mockMap = {}

Module.prototype.require = function(module) {
  if (mockMap[module]) {
    return mockMap[module]
  }
  return _require.call(this, module)
}

module.exports = function(name, fn) {
  mockMap[name] = fn()
}
