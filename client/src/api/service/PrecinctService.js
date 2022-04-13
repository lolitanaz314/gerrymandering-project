import httpClient from "../axios";

const getPrecinctsByStateId = () => {
    return httpClient.get("/api/states/{state_id}/precincts")
}

const getPrecinctsById = () => {
    return httpClient.get("/api/states/{state_id}/precincts/{id}")
}

export default {
    getPrecinctsByStateId, 
    getPrecinctsById
};