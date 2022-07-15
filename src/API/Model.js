import api from "./config"
import axios from "axios"
const config={
    headers: { 
        'Content-Type': 'application/json',
    },
 }
export default{
    GetModel(id){
        return axios.get(`${api.mainBaseUrl}/Model?ID=${id}`);
    },
    SaveDeviceSettings(passcode, data){
        return axios.patch(`${api.mainBaseUrl}/DevSettings/DeviceSettings?passcode=${passcode}`, data);
    },
}