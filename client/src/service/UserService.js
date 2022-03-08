import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/users")
}

export default {getAll};