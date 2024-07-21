import axios from "axios";

const BASEURL="https://learning-model-system.onrender.com/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;