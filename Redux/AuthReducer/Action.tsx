import * as types from "./ActionTypes";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import {Baseurl} from "./api"

const Loginreq = () => {
  return {
    type: types.LOGINUSERREQ,
  };
};

const Loginsuccess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.LOGINUSERSUCESS,
    payload,
  };
};

const Loginfailure = () => {
  return {
    type: types.LOGINUSERFAILURE,
  };
};


const ADDuserReq = () => {
  return {
    type: types.ADDUSERREQ,
  };
};

const ADDuserSucess = (payload: AxiosResponse<any, any>) => {
  return {
    type: types.ADDUSERSUCESS,
    payload,
  };
};

const ADDuserFail = (error: Error) => {
  return {
    type: types.ADDUSERFAILURE,
    payload: error,
  };
};


// login request

export const Loginpost = (payload: any) => (dispatch: Dispatch) => {
  dispatch(Loginreq());
  return axios
    .post(`${Baseurl}/admins/login`, payload)
    .then((r) => {
      return dispatch(Loginsuccess(r.data));
    })
    .catch((err) => {
      return dispatch(Loginfailure());
    });
};

//  Admin created 

export const ADDUSER = (payload: any) => (dispatch: Dispatch) => {
  dispatch(ADDuserReq());
  return axios
    .post(`${Baseurl}/admins`, payload)
    .then((r) => {
      return dispatch(ADDuserSucess(r.data));
    })
    .catch((error: Error) => {
      // throw error;
      return dispatch(ADDuserFail(error));
    });
};
