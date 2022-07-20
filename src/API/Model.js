import api from "./config"
import axios from "axios"
const config={
    headers: { 
        'Content-Type': 'application/json',
    },
 }
export default{
    // GetModel(id){
    //     return axios.get(`${api.mainBaseUrl}/Model?ID=${id}`);
    // },
    UploadModel(data){
        return axios.post(`${api.mainBaseUrl}/Upload/Upload`, data);
    },
    GetModel(id){
        return axios.get(`${api.mainBaseUrl}/Upload/Download?ID=${id}`);
    },
    GetModelZip(id){
        return axios.get(`${api.mainBaseUrl}/Upload/Zip?ID=${id}`);
    },
}