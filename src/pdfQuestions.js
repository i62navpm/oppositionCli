const fs = require('fs')
const ora = require('ora')
const { downloadResources, uploadResources } = require('check-pdf-script')

module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[PDFS]: '.yellow + 'Qué acción quieres hacer?',
    choices: [
      {
        name: 'Descargar los PDFs del portal de educación',
        checked: true,
        value: downloadPdfs,
      },
      {
        name: 'Subir al bucket de Google los PDFs',
        checked: true,
        value: uploadPdfs,
      },
    ],
  },
  nextPrompt: 'jsonQuestions',
}

async function downloadPdfs() {
  const spinner = ora('Descargando PDFs').start()
  try {
    let files = await downloadResources()
    saveFiles(files)
    spinner.succeed('PDFs descargados')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}

async function uploadPdfs() {
  const spinner = ora('Subiendo PDFs a Google Cloud').start()

  try {
    let files = readFiles()
    await uploadResources(files)
    spinner.succeed('PDFs subidos a Google Cloud')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}

function saveFiles(files) {
  let dir = './pdfs'

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  Object.entries(files).forEach(([list, data]) => {
    fs.writeFileSync(`${dir}/${list}.pdf`, data)
  })
}

function readFiles() {
  let dir = './pdfs'

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  return fs.readdirSync(dir).reduce((acc, curr) => {
    const list = curr.split('.')[0]
    acc[list] = fs.readFileSync(`${dir}/${curr}`)
    return acc
  }, {})
}
