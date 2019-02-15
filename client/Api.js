import axios from "axios";

// TODO put that into a config file
const endpoint = "http://localhost:3000/api";

export const isLoggedIn = () => {
    return axios.get(`${endpoint}/loggedin`);
}

export const login = (username, password) => {
    return axios.post(`${endpoint}/login`, {
        username,
        password,
    });
}

export const logout = () => {
    return axios.post(`${endpoint}/logout`, {});
}

export const signUp = (username, password) => {
    return axios.post(`${endpoint}/signUp`, {
        username,
        password,
    });
}

export default {
    isLoggedIn,
    login,
    logout,
    signUp,
}