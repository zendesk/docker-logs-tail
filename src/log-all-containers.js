const Docker = require('dockerode')
const docker = new Docker()
const containerLogs = require('./container-logs')

let watchingContainers = {}

module.exports = function logAllContainers({ tail, useColor }) {
  docker.listContainers({ all: false }, (err, containers) => {
    if (containers) {
      containers.map(container => {
        if (!watchingContainers[container.Id]) {
          watchingContainers[container.Id] = true
          containerLogs(
            docker.getContainer(container.Id),
            container.Names[0].replace(/^\//, ''),
            { tail, useColor, onEnd: ()=>delete watchingContainers[container.Id] }
          )
        }
      })
    }
  })
}
