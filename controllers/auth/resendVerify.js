const User = require('../../models/user');
const RequestError = require('../../helpers/RequestError');
const createVerifyEmail = require('../../helpers/createVerifyEmail');
const sendMail = require('../../helpers/sendMail');

const resendVerify = async (req, res) => {
    const { email } = req.body;
    const user = User.findOne({ email });
    if (!user) {
        throw RequestError(400, 'Verification has already been passed');
    }
    const mail = createVerifyEmail(email, user.verificationToken);
    await sendMail(mail);
    res.json({
        message: 'Verification email sent'
    })
}

module.exports = resendVerify;