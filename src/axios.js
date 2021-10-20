import axios from 'axios';

// base Url to make requests to the movie database
const instance = axios.create({ baseURL: 'https://api.themoviedb.org/3' });

export default instance;

// ref - https://www.akashmittal.com/reactjs-setting-baseurl-axios/