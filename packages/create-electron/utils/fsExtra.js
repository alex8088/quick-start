const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      const srcFile = path.resolve(src, file)
      const destFile = path.resolve(dest, file)
      copy(srcFile, destFile)
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

exports.copy = (src, dest) => {
  if (fs.existsSync(src)) copy(src, dest)
}

function emptyDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

exports.emptyDir = (path) => {
  if (fs.existsSync(path)) emptyDir(path)
}

exports.readYamlFile = (path) => {
  let fileContents = fs.readFileSync(path, 'utf8')
  return yaml.load(fileContents)
}

exports.writeYamlFile = (path, contents) => {
  let data = yaml.dump(contents, { lineWidth: 120 })
  fs.writeFileSync(path, data)
}

exports.readJsonFile = (path) => {
  return require(path)
}

exports.writeJsonFile = (path, contents) => {
  fs.writeFileSync(path, JSON.stringify(contents, null, 2) + '\n')
}

exports.readFile = (path) => {
  let fileContents = fs.readFileSync(path, 'utf8')
  return fileContents
}

exports.writeFile = (path, contents) => {
  fs.writeFileSync(path, contents)
}
