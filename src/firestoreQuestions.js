module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[FIRESTORE]: '.yellow + ' Que acción quieres hacer?',
    choices: [
      {
        name: '1) Actualizar citationList',
        checked: true,
      },
      {
        name: '2) Actualizar voluntaryListDynamic',
        checked: true,
      },
      {
        name: '3) Actualizar incorporateList',
        checked: true,
      },
      {
        name: '4) Actualizar nextCitationList',
        checked: true,
      },
      {
        name: '5) Actualizar nextVoluntaryList',
        checked: true,
      },
      {
        name:
          '6) Recalcular los "desconocidos" ordinarios en la lista de voluntarios',
        checked: true,
      },
    ],
  },
  nextPrompt: 'notificationsQuestions',
}
