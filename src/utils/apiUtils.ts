import { PaginationParams } from "../types/common";
import { Form, fieldAnswer, fieldOption, formField } from "../types/formTypes";

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
      try {
        const json = await response.json();
        return json;
    } catch (error) {
        return null; 
    }
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

export const deleteForm = (formID: number) => {
  return request(`forms/${formID}/`, "DELETE");
};

export const updateForm = (
  formID: number,
  formParam: { title?: string; description?: string }
) => {
  return request(`forms/${formID}/`, "PATCH", formParam);
};

export const fetchFormData = (formID: number) => {
    return request(`forms/${formID}/`, "GET");
  };
  
  export const fetchFormFields = (formID: number) => {
    return request(`forms/${formID}/fields/`, "GET");
  };
   
  export const addField = (
    formID: number,
    fieldParams: {
      label: string;
      kind: formField["kind"];
      options?: [];
      meta?: { description: { fieldType: "text" } };
    }
  ) => {
    return request(`forms/${formID}/fields/`, "POST", fieldParams);
  };  

  export const deleteField = (formID: number, fieldID: number) => {
    return request(`forms/${formID}/fields/${fieldID}/`, "DELETE");
  };

  export const updateField = (
    formID: number,
    fieldID: number,
    fieldParam: {
      label?: string;
      options?: fieldOption[];
      meta?: { description: { fieldType: "text" } };
    }
  ) => {
    return request(`forms/${formID}/fields/${fieldID}/`, "PATCH", fieldParam);
  };

  export const submitForm = (
    formID: number,
    answers: { answers: fieldAnswer[] }
  ) => {
    return request(`forms/${formID}/submission/`, "POST", answers);
  };