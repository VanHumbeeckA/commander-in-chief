import axios from 'axios'
var urljoin = require('url-join')

const host = "https://expected-delivery.appspot.com/"

const getAsync = (endpoint, params) => {
    let url = urljoin(host, endpoint)
    return axios.get(url, {
        params: params
    })
}

const postAsync = (endpoint, body) => {
    let url = urljoin(host, endpoint)
    return axios.post(url, body)
}

export const getDeliveryRounds = () => {
    const endpoint = "driver/round"
    return getAsync(endpoint)
        .then(res => res.data)
}

export const getParcelLocation = () => {
    const url = "https://expected-delivery.firebaseio.com/driver.json"
    console.log("getting current parcel location..")
    return axios.get(url)
        .then(res => res.data)
        // .then(res => {
        //     console.log(JSON.stringify(res))
        // })
}

export const openPostBox = () => {
    const endpoint = "api/receiver/lockbox/open"
    return postAsync(endpoint)
}

export const closePostBox = () => {
    const endpoint = "api/receiver/lockbox/close"
    return postAsync(endpoint)
}

export const meetDriverHalfWay = () => {
    const endpoint = "api/receiver/meeting/"
    return postAsync(endpoint)
        .then(res => res.data)
}