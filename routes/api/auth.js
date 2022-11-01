const express = require("express");
const ctrl = require('../../controllers/auth')
const ctrlWrapper = require('../../helpers/ctrWrapper');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { registerSchema, loginSchema, verifyEmailSchema } = require('../../schemas')

const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify', validateBody(verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));

router.post('/login', validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;