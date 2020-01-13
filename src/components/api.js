import axios from 'axios';

const BASE_URL = 'http://visa.enverhq.com/api';
export default class API {
    constructor(lang = 'EN') {
        this.lang = lang;
    }
    getHttpClient(baseURL = `${BASE_URL}`) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-lang': this.lang
        }
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        setTimeout(function(){localStorage.removeItem("token");}, 1000*60*60);
        this.client = axios.create({
            baseURL: baseURL,
            headers: headers
        })
        return this.client;
    }
}