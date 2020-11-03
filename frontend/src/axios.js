import axios from 'axios';

// Create instance
const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(
  req => {
    console.log(req);
    const token = localStorage.getItem('token');
    req.headers.Authorization =  token ? `Bearer ${token}` : '';
    return req;
  },
  err => {
    // console.log(err);
    return Promise.reject(err);
  }
  );
  
instance.interceptors.response.use(
  res => {
    // console.log(res);
    return res;
  },
  err => {
    // console.log(err);
    return Promise.reject(err);
  }
  );
  
  // const setAuthToken = () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     instance.defaults.headers.common['Authorization'] = token;
  //   } else {
  //     delete axios.defaults.headers.common['Authorization'];
  //   }
  // }

  export default instance;