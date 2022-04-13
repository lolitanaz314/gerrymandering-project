import httpClient from "../axios";

const getDistrictsByDistrictPlanId = () => {
    return httpClient.get("/api/states/{state_id}/districtPlans/{dp_id}/districts")
}

const getDistrictById = () => {
    return httpClient.get("/api/states/{state_id}/districtPlans/{dp_id}/districts/{id}")
}

export default {
    getDistrictsByDistrictPlanId, 
    getDistrictById
};