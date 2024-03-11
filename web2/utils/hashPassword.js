const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try {
        const passwordString = password.toString();

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));

        const hashedPassword = await bcrypt.hash(passwordString, salt);

        return hashedPassword;
    } catch (error) {
        throw new Error('Hashing failed', error);
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    try {
        const plainPasswordString = plainPassword.toString();

        const match = await bcrypt.compare(plainPasswordString, hashedPassword);

        return match; 
    } catch (error) {
        throw new Error('Comparison failed', error);
    }
}

module.exports = {
    comparePasswords,
    hashPassword
}