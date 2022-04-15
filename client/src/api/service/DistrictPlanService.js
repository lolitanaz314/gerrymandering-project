import httpClient from "../axios";

const getDistrictPlansByStateId = (state_id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans")
}

const getDistrictPlanById = (state_id, id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans/" + id)
}

export default {
    getDistrictPlansByStateId, 
    getDistrictPlanById
};