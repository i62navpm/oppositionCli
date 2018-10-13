const ora = require('ora')

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

function downloadPdfs() {
  const spinner = ora('Descargando PDFs').start()

  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      spinner.succeed('PDFs descargados')
      resolve()
    }, 1000)
  })
  return defer
}

function uploadPdfs() {
  const spinner = ora('Subiendo PDFs a Google Cloud').start()

  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      spinner.fail('ha petado algo')
      reject(new Error('ha petado algo'))
    }, 1500)
  })
  return defer
}
