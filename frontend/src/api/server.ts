import { $fetch } from "ohmyfetch";

const api = $fetch.create({
    baseURL: "http://localhost:5000",
});


export default api;