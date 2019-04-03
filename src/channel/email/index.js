const nodemailer = require('nodemailer')
const Channel = require('../index')

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
     * @param {Object} mgs - information about email
     * @param {String} mgs.sender - email's sender
     * @param {String} mgs.receiver - email's receiver
     * @param {String} mgs.subject- email's subject
     * @param {String} mgs.message - email's message
     */
    sendMessage(mgs) {

        return new Promise((resolve, reject) => {
                let sender = '';
                if (mgs.sender) {
                    sender = mgs.sender
                } else {
                    sender = this.auth.user
                }

                this.mailTransport.sendMail({
                    form: sender,
                    to: mgs.receiver,
                    subject: mgs.subject,
                    text: mgs.message
                }, (err, info) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(info)
                    }
                })
            }
        )
    }
}


module.exports = Email;



