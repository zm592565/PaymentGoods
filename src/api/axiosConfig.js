import {USER_ID,BASE_URL,APP_ID,APP_SOURCE,APP_CLIENTTYPE} from './api';
const axiosConfig = {
  baseURL: BASE_URL,/*测试接口地址*/
  retry: 4,
  retryDelay: 1000,
  timeout: 20000,
  withCredentials:true,
  headers: {'Content-Type': 'application/json','source':APP_SOURCE,'clientType':APP_CLIENTTYPE},
  // headers: {'Content-Type': 'application/json','isSKip':true,'appId':'app','source':APP_SOURCE,'clientType':APP_CLIENTTYPE},
};
export default axiosConfig
