import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5251/api/"
});