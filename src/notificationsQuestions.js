module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[NOTIFICATION]: '.yellow + ' Que acción quieres hacer?',
    choices: [
      {
        name: 'Mandar emails',
        checked: true,
      },
      {
        name: 'Mandar notificaciones PUSH',
        checked: true,
      },
    ],
  },
}
