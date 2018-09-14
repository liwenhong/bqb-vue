/**
 * Created by Administrator on 2017/10/27.
 */
// const api_host = `https://api.${你的域名}\${你的项目名\${api_version}`;//https://api.xxxxx.com/blog/v1
//api遵循restful设计，这里规定api返回结构
const response = {
  code: Number,
  msg: String,
  data: Object,
};

import axios from 'axios';
import { Loading } from 'element-ui';
import qs from 'qs'
// import localStore from '../utils/localStore'

const MyPlugin = {};
const isDebug = true;
// axios.defaults.withCredentials = true;//支持跨域请求

MyPlugin.install = function install(Vue, api_host) {
  //构建axios请求基础
  const request = axios.create({
    baseURL: api_host,
    timeout: 15000,// 超时时间
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  //请求方法的构建,type为：get、post、delete等等
  const createRequestFuc = (type) => {
    return function (resource, params, showError = true) {
      // let token = localStorage.getItem('xh-access-token');
      // if (!!token) {
      //   axios.defaults.headers.post['xh-access-token'] = token.replace(/"/g,'');
      // }
      //返回请求的Promise的对象
      return new Promise((resolve, reject) => {
        let loadingInstance = Loading.service({ fullscreen: true, customClass: 'loading', spinner: 'loading', background: '#373f52' });
        // console.log(qs.stringify(params) )
        if (type === 'post') {
          params = qs.stringify(params);
        }
        params = type === 'get' ? { params } : params;
        request[type](resource, params)//调用request
          .then(res => {
            if (isDebug) {
              console.log(res.data);
            }
            if (res && res.data && res.status === 200) {//判断请求返回结果，code为判断值
              resolve(res.data);//返回结果
            } else {
              showError && this.$message.error(res.data);//判断是否调用自带全局waring或error
              reject(res);//无论上面是否执行，都应该reject，阻止代码继续执行
            }
            loadingInstance.close();//结束loading
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("请求失败");//这种情况一般是请求失败，报错方式可以自己更改
            loadingInstance.close();//结束loading
            reject(err);//无论上面是否执行，都应该reject，阻止代码继续执行
          });
      });
    }
  };
  //构建请求
  Vue.prototype.$get = createRequestFuc('get');
  Vue.prototype.$put = createRequestFuc('put');
  Vue.prototype.$post = createRequestFuc('post');
  Vue.prototype.$patch = createRequestFuc('patch');
  Vue.prototype.$delete = createRequestFuc('delete');
};
export default MyPlugin;
