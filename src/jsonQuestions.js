const ora = require('ora')
const Parser = require('parse-pdf-script')
const { uploadResourcesJson } = require('check-pdf-script')
const { saveFiles, readFiles } = require('./utils/files')

module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[JSON]: '.yellow + ' Que acción quieres hacer?',
    choices: [
      {
        name: 'Crear los JSONs',
        checked: true,
        value: createJsons,
      },
      {
        name: 'Subir al bucket de Google los JSONs',
        checked: true,
        value: uploadJsons,
      },
    ],
  },
  nextPrompt: 'firestoreQuestions',
}

async function createJsons() {
  const spinner = ora('Generando JSONs').start()
  try {
    let files = readFiles('pdf')
    for (const [list, data] of Object.entries(files)) {
      const parser = new Parser(list, data)
      files[list] = JSON.stringify(await parser.readPdfFile())
    }
    saveFiles(files, 'json')
    spinner.succeed('JSONs generados')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}

async function uploadJsons() {
  const spinner = ora('Subiendo PDFs a Google Cloud').start()

  try {
    let files = readFiles('pdf')
    await uploadResourcesJson(files)
    spinner.succeed('JSONs subidos a Google Cloud')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}
