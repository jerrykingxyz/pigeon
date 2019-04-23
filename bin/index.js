const http = require('http')
const Pigeon = require('../src/index')
const Webhook = require('../src/channel/webhook')

const pigeon = new Pigeon()
pigeon.addChannel(
  new Webhook('webhook', {
    url: '/test',
    headers: {
      testMsg: 'test'
    }
  })
)

const getHttpBody = function(request) {
  return new Promise(res => {
    let content = ''
    request.on('data', chunk => {
      content += chunk
    })
    request.on('end', () => {
      res(JSON.parse(content))
    })
  })
}

const endHttp = function(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' })
  if (body) {
    res.write(JSON.stringify(body))
  }
  res.end()
}

http
  .createServer((request, response) => {
    if (request.method !== 'POST') {
      endHttp(response, 404)
      return
    }

    const channel = request.url.substring(1)
    getHttpBody(request)
      .then(body => {
        return pigeon.send({
          channel,
          msg: body
        })
      })
      .then(res => {
        endHttp(response, 200, res)
      })
      .catch(err => {
        endHttp(response, 500, err)
      })
  })
  .listen(8080)
