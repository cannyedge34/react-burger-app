import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactjs-189016.firebaseio.com/'
});

export default instance;
