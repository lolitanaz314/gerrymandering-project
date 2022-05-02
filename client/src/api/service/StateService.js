import httpClient from "../axios";

const getStates = () => {
    return httpClient.get("/states")
}

const getStateById = (state_id) => {
    // console.log(httpClient.get("/states/"+state_id))
    return httpClient.get("/states/"+state_id)
}

const getBoxAndWhisker = (state_id, demographic) => {
    // console.log(httpClient.get("/states/"+state_id))
    return httpClient.get("/states/"+state_id+"/box-and-whisker/"+demographic)
}

export default {
    getStates, 
    getStateById,
    getBoxAndWhisker
};