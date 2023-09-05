import { Form } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export const request = async (endpoint: string, method: RequestMethod = 'GET', data: any = {}) => {
    let url;
    let payload: string;
    if(method === 'GET'){
        const requestPasrams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : "";
        url = `${API_BASE_URL}${endpoint}${requestPasrams}`;
        payload = "";
    }else{
        url = `${API_BASE_URL}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
    }

    const auth = "Basic " + window.btoa("sriharsh:J99WCbh3sfrwmFB")
    const response = await fetch(
        url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: payload
    });
    if(response.ok){
        const json = await response.json();
        return json;
    }else{
        const errorJson = await response.json();
        throw Error(errorJson);
    }
}

export const createForm = (form: Form) => {
    return request('forms/', 'POST', form);
}