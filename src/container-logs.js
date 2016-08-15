const stream = require('stream')

const outputLog = require('./output-log')

module.exports = function containerLogs(container, name, { tail, useColor }) {
  var logStream = new stream.PassThrough()
  logStream.on('data', function(chunk){
    outputLog(name, chunk.toString(), { useColor })
  })

  container.logs({
    follow: true,
    stdout: true,
    stderr: true,
    tail
  }, (err, stream) =>{
    if (err) {
      return console.error(err.message)
    }
    container.modem.demuxStream(stream, logStream, logStream)
    stream.on('end', () => {
      logStream.end('(stopped)')
    })
  })
}
