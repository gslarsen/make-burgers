import axios from 'axios';

const instance = axios.create({
  baseURL: "https://make-burger-3157b.firebaseio.com/"
});

export default instance;