import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/demographic")
}

export default {getAll};