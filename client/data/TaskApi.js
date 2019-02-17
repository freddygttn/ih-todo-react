import axios from "axios";

// TODO put that into a config file
const endpoint = "http://localhost:3000/api/tasks";

export const list = () => {
    return axios.get(`${endpoint}`);
}

export const create = (title, description) => {
    return axios.post(`${endpoint}/create`, {
        title,
        description,
    });
}

export const update = (id, title, description) => {
    return axios.post(`${endpoint}/edit/${id}`, {
        title,
        description,
    });
}

export const remove = (id) => {
    return axios.post(`${endpoint}/delete/${id}`, {
        username,
        password,
    });
}

export default {
    list,
    create,
    update,
    remove,
}