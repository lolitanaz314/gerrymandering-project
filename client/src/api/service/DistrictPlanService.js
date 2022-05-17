import httpClient from "../axios";

const getDistrictPlansByStateId = (state_id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans")
}

const getDistrictPlanById = (state_id, id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans/"+id)
}

const compareDistrictPlans = (state_id, id1, id2) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans/"+id1+"/"+id2)
}

export default {
    getDistrictPlansByStateId, 
    getDistrictPlanById,
    compareDistrictPlans
};