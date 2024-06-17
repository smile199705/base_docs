
const util = require('util')
const events = require('events')
function InitEventEmitter() {
    events.EventEmitter.call(this);
}

util.inherits(InitEventEmitter, events.EventEmitter)

const init = new InitEventEmitter()

init.on('start', (option) => {
    console.log('start=====', option)
})

init.emit('start', '这是一个开始')
