import axios from "axios";
const baseURL = "http://192.168.12.25:8000";

export default axios.create({
    baseURL,
    headers: {
        Authorization: sessionStorage.getItem("token") ? "JWT" + sessionStorage.getItem("token") : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
})