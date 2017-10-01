const Docker = require('dockerode')
const docker = new Docker()
const containerLogs = require('./container-logs')

let watchingContainers = {}

module.exports = function logAllContainers({ tail, useColor, include, exclude }) {
    let includes = (include ? include.split(',') : []);
    let excludes = (exclude ? exclude.split(',') : []);
    docker.listContainers({ all: false }, (err, containers) => {
    if (containers) {
      containers.map(container => {
        const containerName = container.Names[0].replace(/^\//, '');
        // Look for things to whitelist
        if (includes.length>0) {
          let whiteListOK = false;
          for (let i = 0; i < includes.length; i++) {
            const re = new RegExp('^' + includes[i].replace(/\*/g, '(.*)') + '$', 'i');
            const found = containerName.match(re);
            if (found) {
              whiteListOK = true;
            }
          }
          // If whiteListOK is not OK, skip entry
          if (!whiteListOK) {
            return null;
          }
        }
        // Look for things to blacklist
        for (let i = 0; i < excludes.length; i++) {
          const re = new RegExp('^' + excludes[i].replace(/\*/g, '(.*)') + '$', 'i');
          const found = containerName.match(re);
          if (found) {
            return null;
          }
        }
        // Passed whitelist/blacklist checks
        if (!watchingContainers[container.Id]) {
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
