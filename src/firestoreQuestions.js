const ora = require('ora')
const {
  updateMainLists,
  updateNextVoluntaryList,
  updateRecalcVoluntaryList,
} = require('update-firestore-script')
const { readFile } = require('./utils/files')

module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[FIRESTORE]: '.yellow + ' Que acción quieres hacer?',
    choices: [
      {
        name: '1) Actualizar citationList',
        checked: true,
        value: () => updateFirestore('citationList'),
      },
      {
        name: '2) Actualizar voluntaryListDynamic',
        checked: true,
        value: () => updateFirestore('voluntaryListDynamic'),
      },
      {
        name: '3) Actualizar incorporateList',
        checked: true,
        value: () => updateFirestore('incorporateList'),
      },
      {
        name: '4) Actualizar nextCitationList',
        checked: true,
        value: () => updateFirestore('nextCitationList'),
      },
      {
        name: '5) Actualizar nextVoluntaryList',
        checked: true,
        value: () => updateFirestore('nextVoluntaryList'),
      },
      {
        name:
          '6) Recalcular los "desconocidos" ordinarios en la lista de voluntarios',
        checked: true,
        value: () => updateFirestore('recalcVoluntary'),
      },
    ],
  },
  nextPrompt: 'notificationsQuestions',
}

async function updateFirestore(list) {
  const spinner = ora(`Actualizando "${list}" en Firestore`).start()
  try {
    if (list === 'nextVoluntaryList') {
      const data = JSON.parse(
        readFile('voluntaryListDynamic', 'json').toString()
      )
      await updateNextVoluntaryList(list, data)
    } else if (list === 'recalcVoluntary') {
      await updateRecalcVoluntaryList()
    } else {
      const data = JSON.parse(readFile(list, 'json').toString())
      await updateMainLists(list, data)
    }
    spinner.succeed(`Actualizado "${list}"`)
    return true
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}
