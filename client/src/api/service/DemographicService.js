// This needs to be edited or removed
import httpClient from "../axios";

const getAllDemographics = () => {
  return httpClient.get("/demographic")
}

export default {getAllDemographics};