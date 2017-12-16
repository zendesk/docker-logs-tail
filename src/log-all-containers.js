const Docker = require('dockerode')
const docker = new Docker()
const containerLogs = require('./container-logs')

let watchingContainers = {}

module.exports = function logAllContainers({ tail, useColor, pattern }) {
  let patternRegex = pattern ? new RegExp(pattern) : new RegExp()

  docker.listContainers({ all: false }, (err, containers) => {
    if (containers) {
      containers.map(container => {
        let containerName = container.Names[0].replace(/^\//, '')
        if (!watchingContainers[container.Id] && patternRegex.test(containerName)) {
          watchingContainers[container.Id] = true
          containerLogs(
            docker.getContainer(container.Id),
            containerName,
            { tail, useColor }
          )
        }
      })
    }
  })
}
