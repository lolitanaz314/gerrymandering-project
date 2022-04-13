import httpClient from "../axios";

const getDistrictPlansByStateId = () => {
    return httpClient.get("/api/states/{state_id}/districtPlans")
}

const getDistrictPlanById = () => {
    return httpClient.get("/api/states/{state_id}/districtPlans/{id}")
}

export default {
    getDistrictPlansByStateId, 
    getDistrictPlanById
};