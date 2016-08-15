const chalk = require('chalk')
const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan']

function hashCode(s) {
  return Math.abs(s.split("").reduce((a, b) => {
    const x = ((a << 5) - a) + b.charCodeAt(0)
    return x & x
  }, 0))
}

let currentContainerName

function formatName(name, useColor) {
  if (useColor) {
    const color = colors[hashCode(name) % 6]
    return chalk[color].inverse(` ${name} `)
  } else {
    return `[${name}]`
  }
}

module.exports = function outputLog(containerName, line, { useColor }) {
  const trimmedLine = line.replace(/\n+$/, '')
  if (trimmedLine === '') {
    return
  }

  if (containerName !== currentContainerName) {
    console.log('\n' + formatName(containerName, useColor))
    currentContainerName = containerName
  }
  console.log(trimmedLine)
}
