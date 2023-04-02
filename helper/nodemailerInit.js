const Sib = require('sib-api-v3-sdk')

const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY
let transporter = new Sib.TransactionalEmailsApi()

module.exports = transporter