const inquirer = require('inquirer')
const colors = require('colors')

const promptOptions = {
  pdfQuestions: require('./src/pdfQuestions'),
  jsonQuestions: require('./src/jsonQuestions'),
  firestoreQuestions: require('./src/firestoreQuestions'),
  notificationsQuestions: require('./src/notificationsQuestions'),
}

const choices = [
  {
    name: '1) Ver opciones de los PDFs',
    value: 'pdfQuestions',
  },
  {
    name: '2) Ver opciones de los JSON',
    value: 'jsonQuestions',
  },
  {
    name: '3) Enviar los JSONs a Firestore',
    value: 'firestoreQuestions',
  },
  {
    name: '4) Enviar notificaciones',
    value: 'notificationsQuestions',
  },
]

const questions = [
  {
    type: 'list',
    name: 'mainQuestions',
    message: 'ListandoMe'.america,
    choices,
  },
]

function showError(message) {
  console.log(colors.red('Error: '), message)
}

function secondaryAsk(answer) {
  const { questions, nextPrompt } = promptOptions[answer]

  inquirer.prompt(questions).then(async response => {
    for (const question of response.secondQuestions) {
      try {
        await question()
      } catch (err) {
        showError(err.message)
      }
    }

    nextPrompt ? secondaryAsk(nextPrompt) : mainAsk()
  })
}

function mainAsk() {
  inquirer.prompt(questions).then(answer => secondaryAsk(answer.mainQuestions))
}

mainAsk()
