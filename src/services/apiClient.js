import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://api.spacexdata.com/v3',
});

export default customFetch;
