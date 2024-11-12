import axios from "axios";

const api = axios.create({

    //react server
    //baseURL: "http://localhost:8000/",

    //spring server
    baseURL: "http://localhost:8001/",

})  

export default api ;