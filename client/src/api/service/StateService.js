import httpClient from "../axios";

const getStates = () => {
    return httpClient.get("/api/states")
}

const getStateById = () => {
    return httpClient.get("/api/states/{id}")
}

export default {
    getStates, 
    getStateById
};