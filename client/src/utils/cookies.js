import axios from "axios"
import Cookies from "js-cookie"

export const setCookie = async (email, privateKey) => {
    try {
        const response = await axios.post('http://localhost:8000/user/generateJWT', {
            email,
            privateKey
        })
        Cookies.set('myCookie', response, { expires: 1 });
    } catch (e) {
        console.log(e)
    }

}

export const authorizeCookie = async (email, cookie) => {
    const jwt = Cookies.get('myCookie')
    if (jwt) {

        try {
            const response = await axios.post('http://localhost:8000/user/validateJWT', {
                email,
                jwt

            })
            return response
        } catch (e) {
            console.log(e)
            return false
        }
    } else {
        return false
    }
}