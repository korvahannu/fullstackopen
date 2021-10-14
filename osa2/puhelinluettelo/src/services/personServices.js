import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {

    const request = axios.get(baseUrl);

    return request.then(
        response => response.data
    );

}

const addPerson = (newPerson) => {

    const request = axios.post(baseUrl, newPerson);

    return request.then(
        response => response.data
    );

}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);

    request.then(
        response => console.log(response)
    );
}

const updatePerson = (id, newPerson) => {
    console.log(id + " and " + newPerson)
    const request = axios.put(`${baseUrl}/${id}`, newPerson);

    return request.then(response => response.data);
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getAll, addPerson, deletePerson, updatePerson}