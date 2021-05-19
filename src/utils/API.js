import {DATABASE_URL, AUTH_URL, GOOGLE_URL} from './Constants';

import axios from 'axios';

const DATABASE = axios.create({
    baseURL:DATABASE_URL
}) 

const AUTH = axios.create({
    baseURL:AUTH_URL
}) 

const GOOGLEAPI = axios.create({
    baseURL:GOOGLE_URL
}) 

export {DATABASE, AUTH, GOOGLEAPI};