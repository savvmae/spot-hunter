import axios from 'axios'


export function registerService(param) {
    console.log("i am the register service")

    return axios({
        method: 'post',
        url: 'https://user-auth-test.herokuapp.com/register',
        data: {
            email: param.email,
            password: param.password,
            full_name: param.name,
            message: param.secret
        }
    }).then(serverResponse => {
        console.log(serverResponse)
        return serverResponse
    })
}

export function loginService(param) {
    console.log('I am in the service')
    return axios({
        method: 'post',
        url: 'https://user-auth-test.herokuapp.com/login',
        data: {
            email: param.email,
            password: param.password
        }
    }).then(serverResponse => {
        console.log(serverResponse, "i am the service response")
        return serverResponse
    })
}

export function dashboardService(param) {
    console.log("i am triggering")
    return axios({
        method: 'get',
        url: 'https://user-auth-test.herokuapp.com/dashboard',
        headers: {
            'X-AUTH-TOKEN': param
        }
    }).then(serverResponse => {
        console.log(serverResponse)
        return serverResponse
    })
}

export function searchService(param) {
    return axios.get('https://proxy.calweb.xyz/https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + param + '&key=AIzaSyAWa0K4pJPUraabbqexa91ToelqfKN7QNQ')
        .then(res => {
            console.log(res)
            let loc = res.data.results[0].geometry.location;
            return loc
        })
}
// working, ready to get plugged into api
// export function addSpotService(details) { 
//     return axios.post('api')
//         .then(res => {
//             console.log(res)
//             return res
//         })
// }