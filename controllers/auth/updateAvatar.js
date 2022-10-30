const fs = require('fs/promises');
const path = require('path');
const User = require('../../models/user');
const optimizedImage = require('../../helpers/optimizedImage')


const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { path: tempUpload, originalname } = req.file;
        await optimizedImage(tempUpload);
        const extention = originalname.split('.').pop();
        const fileName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarDir, originalname);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', fileName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatar;