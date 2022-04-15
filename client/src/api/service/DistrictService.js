import httpClient from "../axios";

const getDistrictsByDistrictPlanId = (state_id, district_plan_id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans/" + district_plan_id + "/districts")
}

const getDistrictById = (state_id, district_plan_id, id) => {
    return httpClient.get("/api/states/"+state_id+"/districtPlans/" + district_plan_id + "/districts/" + id)
}

export default {
    getDistrictsByDistrictPlanId, 
    getDistrictById
};