const fs = require('fs')

function saveFiles(files, format) {
  let dir = `./${format}s`

  !fs.existsSync(dir) && fs.mkdirSync(dir)

  Object.entries(files).forEach(([list, data]) => {
    fs.writeFileSync(`${dir}/${list}.${format}`, data)
  })
}

function readFiles(format) {
  let dir = `./${format}s`

  !fs.existsSync(dir) && fs.mkdirSync(dir)

  return fs.readdirSync(dir).reduce((acc, curr) => {
    const list = curr.split('.')[0]
    acc[list] = fs.readFileSync(`${dir}/${curr}`)
    return acc
  }, {})
}

function readFile(file, format) {
  let dir = `./${format}s`

  !fs.existsSync(dir) && fs.mkdirSync(dir)

  return fs.readFileSync(`${dir}/${file}.${format}`)
}

module.exports = { saveFiles, readFiles, readFile }
