import { PaginationParams } from "../types/common";
import { Form, formField } from "../types/formTypes";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export const request = async (endpoint: string, method: RequestMethod = 'GET', data: any = {}) => {
    let url;
    let payload: string;
    if(method === 'GET'){
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}` : "";
        url = `${API_BASE_URL}${endpoint}${requestParams}`;
        payload = "";
    }else{
        url = `${API_BASE_URL}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
    }
    
    // Basic Authentication
    // const auth = "Basic " + window.btoa("sriharsh:J99WCbh3sfrwmFB")

    // Token Authentication
    const token = localStorage.getItem("token");
    const auth = token ? "Token " + localStorage.getItem("token") : "";
    const response = await fetch(
        url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: (method !== 'GET') ? payload : null
    });
    if(response.ok){
        const json = await response.json();
        return json;
    }else{
        const errorJson = await response.json();
        throw Error(errorJson);
    }
}

export const login = (username: string, password: string) => {
	return request('auth-token/', 'POST', { username, password });
};

export const me = () => {
	return request('users/me/', 'GET', {});
};

export const createForm = (form: Form) => {
    return request('forms/', 'POST', form);
}
export const listForms = (pageParams: PaginationParams) => {
    return request('forms/', 'GET', pageParams);
}

export const fetchFormData = (formID: number) => {
    return request(`forms/${formID}/`, "GET");
  };
  
  export const fetchFormFields = (formID: number) => {
    return request(`forms/${formID}/fields/`, "GET");
  };
   