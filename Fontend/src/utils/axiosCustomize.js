import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHVpdC5jcyIsInJvbGUiOiJBRE1JTiJ9.9ZA43zjsUS5fXO5cNbOrEDp57FrffCeSDzrAu8vZL0o',
    }
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // const access_token = store?.getState()?.user?.account?.access_token;
        // config.headers["Authorization"] = `Bearer ${access_token}`;
        NProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response;
    },
    function (error) {
        NProgress.done();
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

export default instance;
