import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { Baseurl } from "../AuthReducer/api";

//  Get user Logged data

const getdatareq = () => {
  return {
    type: types.GETLOGEEDUSERDATAREQ,
  };
};

const getdatasuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.GETLOGEEDUSERDATASUCESS,
    payload,
  };
};

const getdatafailure = () => {
  return {
    type: types.GETLOGEEDUSERDATAFAILURE,
  };
};

 /** Aws images and videos */

const ProjectfromReq = () => {
  return {
    type: types.PROJECTFORMPRIMAGESREQ,
  };
};

const ProjectformSucess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.PROJECTFORMPRIMAGESSUCESS,
    payload,
  };
};

const ProjectfromFail = () => {
  return {
    type: types.PROJECTFORMPRIMAGESFAILURE,
  };
};
// ------------ Put  -----------

const updatedawsReq = () => {
  return {
    type: types.UPDATEDIMAGESAWS_DATA_REQUEST,
  };
};
const updatedawssucess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.UPDATEDIMAGESAWS_DATA_SUCESS,
    payload,
  };
};
const updatedawsFail = () => {
  return {
    type: types.UPDATEDIMAGESAWS_DATA_FAILURE,
  };
};

 /***   */

  const projectcreateReq = () => {
    return {
      type: types.UPDATEDIMAGESAWS_DATA_REQUEST,
    };
  };
  const projectcreatesucess = (payload: AxiosResponse<any, any>) => {
    return {
      type: types.UPDATEDIMAGESAWS_DATA_SUCESS,
      payload,
    };
  };
  const projectcreateFail = () => {
    return {
      type: types.UPDATEDIMAGESAWS_DATA_FAILURE,
    };
  };



 export const GetpresignedurlData = (param: any) => (dispatch: Dispatch) => {
   dispatch(ProjectfromReq());
   return axios
     .post(`${Baseurl}/aws/`,param)
     .then((r) => {
       return dispatch(ProjectformSucess(r.data));
     })
     .catch((err) => {
       return dispatch(ProjectfromFail());
     });
 };


 export const UpdatedAwsPost =
   (apiurl: any, payload: any) => (dispatch: Dispatch) => {
     dispatch(updatedawsReq());
     return axios
       .put(apiurl, payload)
       .then((res) => {
         return dispatch(updatedawssucess(res.data));
       })
       .catch((e) => {
         return dispatch(updatedawsFail());
       });
   };

export const  Projectcreatepost =(payload:any)=> (dispatch: Dispatch) => {
  interface Usertoken {
    token: string;
  }
  const utoken = localStorage.getItem("token");
  const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;
  const payloadtoken = {
    token: token?.token
  };

  dispatch(projectcreateReq());

  return axios
    .post(`${Baseurl}/condos-or-projects/projects`, payload, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token?.token}`,
      },
    })
    .then((r) => {
      return dispatch(projectcreatesucess(r.data));
    })
    .catch((err) => {
      dispatch(projectcreateFail());
    });
};





export const GetloggedData = (dispatch: Dispatch) => {
 interface Usertoken {
   token: string;
 }
 const utoken = localStorage.getItem("token");
 const token: Usertoken | null = utoken ? JSON.parse(utoken) : null;
 const payload = {
   token: token?.token,
 };

//  console.log("payload", payload);
//  console.log("token", token);
  dispatch(getdatareq());

  return axios
    .get(`${Baseurl}/user/get/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => {
      return dispatch(getdatasuccess(r.data));
    })
    .catch((err) => {
      dispatch(getdatafailure());
    });
};



