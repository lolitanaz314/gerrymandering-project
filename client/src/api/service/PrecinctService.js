import httpClient from "../axios";

const getPrecinctsByStateId = (state_id) => {
    return httpClient.get("/api/states/"+state_id+"/precincts")
}

const getPrecinctsById = (state_id, id) => {
    return httpClient.get("/api/states/"+state_id+"/precincts/"+id)
}

export default {
    getPrecinctsByStateId, 
    getPrecinctsById
};