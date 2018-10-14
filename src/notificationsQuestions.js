const ora = require('ora')
const { bulkSendEmails, bulkSendPush } = require('send-notifications')

module.exports = {
  questions: {
    type: 'checkbox',
    name: 'secondQuestions',
    message: '[NOTIFICATION]: '.yellow + ' Que acción quieres hacer?',
    choices: [
      {
        name: 'Mandar emails',
        checked: true,
        value: sendEmails,
      },
      {
        name: 'Mandar notificaciones PUSH',
        checked: true,
        value: sendPush,
      },
    ],
  },
}

async function sendEmails() {
  const spinner = ora('Enviando emails').start()
  try {
    await bulkSendEmails()
    spinner.succeed('Emails enviados')
    return true
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}

async function sendPush() {
  const spinner = ora('Enviando notificaciones Push').start()
  try {
    await bulkSendPush()
    spinner.succeed('Notificaciones push enviadas')
  } catch (err) {
    spinner.fail(err.message)
    return err
  }
}
