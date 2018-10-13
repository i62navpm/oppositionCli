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

function createJsons() {
  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('yoooooja1')
      resolve()
    }, 1000)
  })
  return defer
}

function uploadJsons() {
  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('yoooooja2')
      reject(new Error('ha petado algo'))
    }, 1500)
  })
  return defer
}
