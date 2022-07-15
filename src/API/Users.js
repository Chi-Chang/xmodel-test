import api from "./config"
import axios from "axios"

export default{
    GetUser(username){
        return axios.get(`${api.mainBaseUrl}/User?username=${username}`)
    },
    Signin(data){
        return axios.post(`${api.mainBaseUrl}/Users/Signin`, data);
    },
    GetMyInfo(passcode){
        return axios.get(`${api.mainBaseUrl}/Users/GetMyInfo?passcode=${passcode}`)
    },
    // GetUser(passcode, userId){
    //     return axios.get(`${api.mainBaseUrl}/Users/GetMyInfo?passcode=${passcode}&userId=${userId}`)
    // },
    GetUsers(passcode){
        return axios.get(`${api.mainBaseUrl}/Users/GetUsers?passcode=${passcode}`) 
    },
    UpdateInfo(passcode, data){
        return axios.patch(`${api.mainBaseUrl}/Users/UpdateInfo?passcode=${passcode}`, data)
    },
    AddUser(passcode, data){
        return axios.post(`${api.mainBaseUrl}/Users/AddUser?passcode=${passcode}`, data)
    },
    EditUser(passcode, data){
        return axios.patch(`${api.mainBaseUrl}/Users/EditUser?passcode=${passcode}`, data)
    },
    DeleteUser(passcode, id){
        let params ={
            userId: id
        }
        return axios.delete(`${api.mainBaseUrl}/Users/DeleteUser?passcode=${passcode}`, {params})
    },
    ResetPassword(passcode, id){
        let params ={
            userId: id
        }
        return axios.get(`${api.mainBaseUrl}/Users/ResetPassword?passcode=${passcode}`, {params} )
    },
    Signout(passcode){
        return axios.get(`${api.mainBaseUrl}/Users/Signout?passcode=${passcode}`)
    },

}