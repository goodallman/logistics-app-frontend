import axios from "axios"
import config from "../config/config"
import Cookies from "js-cookie"

const loginUser = async(email, password) => {
    const request = await axios.post(
        config.apiUrl + "/api/user/auth",
        JSON.stringify({
            email: email,
            password: password
        }),
        {
            withCredentials: true,
        }
    )

    return request.data
}

const checkLogin = async() => {
    const request = await axios.get(
        config.apiUrl + "/api/user/auth",
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return request.data
}

export {loginUser, checkLogin}