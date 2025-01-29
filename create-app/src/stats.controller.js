import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getLabMemberYears = async (callback) => {
    try{
        const response = await axios.get(`${BASE_URL}/lab-members/years/all`)
        callback(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getLabMembersMajors = async (callback) => {
    try{
        const response  = await axios.get(`${BASE_URL}/lab-members/majors/all`)
        callback(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getMentorsStatus = async (callback) => {
    try{
        const response = await axios.get(`${BASE_URL}/lab-members/mentor-status/all`)
        callback(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getFavoriteThings = async (callback) => {
    try{
        const response  = await axios.get(`${BASE_URL}/lab-members/favorite-things/all`)
        callback(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}

export const getAgeDistribution = async (callback) => {
    try{
        const response  = await axios.get(`${BASE_URL}/lab-members/age-distribution/all`)
        callback(response.data)
        return response.data;
    }catch(err){
        throw err;
    }
}