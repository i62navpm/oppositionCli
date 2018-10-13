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
      console.log('yoooooja1')
      spinner.text = 'PDFs descargados'
      spinner.succeed()
      resolve()
    }, 1000)
  })
  return defer
}

function uploadPdfs() {
  const spinner = ora('Subiendo PDFs a google').start()
  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('yoooooja2')
      spinner.fail('ha petado algo')
      reject(new Error('ha petado algo'))
    }, 1500)
  })
  return defer
}
