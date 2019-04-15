const nodemailer = require('nodemailer')
const Channel = require('../index')
const {promisify} = require('util')

/**
 * Email Channel
 */
class Email extends Channel {

    /**
     * @construstor
     * @param {Object} options - channel options
     * @param {String} options.host - sender email host
     * @param {Object} options.auth - information about sender
     * @param {String} options.auth.user - sender's email address
     * @param {String} options.auth.pass - sender's email authorization code
     */
    constructor(name, options) {
        super(name);

        this.auth = options.auth

        this.mailTransport = nodemailer.createTransport({
            host: options.host,
            secureConnection: true,
            auth: options.auth,
        })
    }

    /**
     *
     * @param {Object} msg - information about email
     * @param {String} msg.sender - email's sender
     * @param {String} msg.receiver - email's receiver
     * @param {String} msg.subject- email's subject
     * @param {String} msg.message - email's message
     */
    sendMessage(msg) {
        let sender = msg.sender || this.auth.user;

        const sendMail = promisify(this.mailTransport.sendMail)

        return sendMail({
            form: sender,
            to: msg.receiver,
            subject: msg.subject,
            text: msg.message
        })
    }
}


module.exports = Email;



