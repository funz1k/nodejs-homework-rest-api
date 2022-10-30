const handleSaveErrors = require('../helpers/handleSaveError');
const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const validateFavorite = require('./validateFavorite');
const authenticate = require('./authenticate');
const upload = require('./upoload');

module.exports = {
    handleSaveErrors,
    validateBody,
    validateFavorite,
    isValidId,
    authenticate,
    upload,
}