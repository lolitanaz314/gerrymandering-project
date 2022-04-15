import httpClient from "../axios";

const getStates = () => {
    return httpClient.get("/states")
}

const getStateById = (state_id) => {
    console.log(httpClient.get("/states/"+state_id))
    return httpClient.get("/states/"+state_id)
}

export default {
    getStates, 
    getStateById
};