const isValidEmail = (email) => {
    const emailReg= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);

};
export default isValidEmail;