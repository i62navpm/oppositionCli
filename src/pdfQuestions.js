const ora = require('ora')
const { downloadResources, uploadResources } = require('check-pdf-script')
const { saveFiles, readFiles } = require('./utils/files')

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
    saveFiles(files, 'pdf')
    spinner.succeed('PDFs descargados')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}

async function uploadPdfs() {
  const spinner = ora('Subiendo PDFs a Google Cloud y Firebase').start()

  try {
    let files = readFiles('pdf')
    await uploadResources(files)
    spinner.succeed('PDFs subidos a Google Cloud y Firebase')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}
