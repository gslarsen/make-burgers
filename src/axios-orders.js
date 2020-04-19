import axios from 'axios';

const instance = axios.create({
  baseURL: "https://make-burger-3157b.firebaseio.com/"
});

instance.interceptors.request.use(request => {
  console.log('[axios-orders] request success:', request);
  return request;
}, error => {
  console.log('[axios-orders] request fail:', error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log('[axios-orders] response:', response);
  return response;
}, error => {
  console.log('[axios-orders] response fail:', error);
  return Promise.reject(error);
});

export default instance;