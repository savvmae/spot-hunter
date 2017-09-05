import { registerService, loginService, dashboardService, searchService, addSpotService } from './services'
import axios from 'axios'


export const GET_RESPONSE = "GET_RESPONSE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const LOGOUT = "LOGOUT";
export const TOGGLE_LANDING = "TOGGLE_LANDING";
export const TOGGLE_LOGIN = "TOGGLE_LOGIN";
export const TOGGLE_REGISTER = "TOGGLE_REGISTER";
export const SET_LOCATION = "SET_LOCATION";
export const TOGGLE_MARKER = "TOGGLE_MARKER";
export const TOGGLE_MARKER_AND_SET_LOCATION = "TOGGLE_MARKER_AND_SET_LOCATION";
export const TOGGLE_DETAIL_MARKER = "TOGGLE_DETAIL_MARKER";
export const SPOT_DETAILS = "SPOT_DETAILS";



export function register(user) {
    return (dispatch, getState) => {
        return registerService(user).then(function (res) {
            dispatch(getResponseAction(res.data.success))
        })
    }
}

export function login(user) {
    return (dispatch, getState) => {
        return loginService(user).then(function (res) {
            dispatch(setToken(res.data.auth_token))
            dispatch(dashboard())
        })
    }
}

export function dashboard(token) {
    return (dispatch, getState) => {
        token = token || getState().token;
        if (!token) {
            return;
        }
        return dashboardService(token).then(function (res) {
            dispatch(setUser(res.data))
        })
    }
}

export function searchCity(location) {
    return (dispatch, getState) => {
        return searchService(location).then((res) => {
            dispatch(loading())
            dispatch(setLocation(res))
        })
    }
}
// export function newMarker(position) {
//     return (dispatch, getState)
//     //  needs to take position as parameter, render new marker with details listed
// }
export function submitNewSpot(payload) {
    console.log(payload)
    return (dispatch, getState) =>
        dispatch(toggleMarkerModal())
    // dispatch(toggleMarkerDetailModal())

    // service looking good
    // return (dispatch, getState) => {
    //     return addSpotService(payload).then((res) => {
    // dispatch(toggleMarkerDetailModal())
    //         dispatch(toggleMarkerModal())
    //         //dispatch new marker??
    // })
    // }
    // return make new marker
    // return { type: SPOT_DETAILS, payload }
}
export function setLocation(location) {
    return { type: SET_LOCATION, location }
}
export function logout(payload) {
    return { type: LOGOUT, payload }
}

export function loading(payload) {
    return { type: TOGGLE_LOADING, payload }
}

export function toggleLanding(payload) {
    return { type: TOGGLE_LANDING, payload }
}

export function toggleLogin(payload) {
    return { type: TOGGLE_LOGIN, payload }
}

export function toggleRegister(payload) {
    return { type: TOGGLE_REGISTER, payload }
}

export function toggleMarkerModal(payload) {
    if (payload) {
        return { type: TOGGLE_MARKER_AND_SET_LOCATION, payload }
    } else {
        return { type: TOGGLE_MARKER, payload }
    }
}

export function toggleMarkerDetailModal(payload) {
    return { type: TOGGLE_DETAIL_MARKER, payload }
}

function getResponseAction(payload) {
    return { type: GET_RESPONSE, payload }
}

function setToken(payload) {
    return { type: SET_TOKEN, payload }
}

function setUser(payload) {
    return { type: SET_USER, payload }
}
