import axios from 'axios'
const token =localStorage.getItem('token')
const instance = axios.create({
  baseURL:"http://localhost:9000" ,
  headers:{

  },
 
});


instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers["token"] = `Bearer ${token}`;
  config.headers["Access-Control-Allow-Origin"] = "*"
  
  return config;
});
export default instance
