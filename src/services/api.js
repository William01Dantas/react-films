import axios from "axios";

// url:
// https://api.themoviedb.org/3
// /movie/now_playing?api_key=2a49a75e0a624e49685d0d24b3480923&language=pt-BR&page=1

export const key = '2a49a75e0a624e49685d0d24b3480923'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;