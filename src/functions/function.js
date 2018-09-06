/*
  name@公共方法
  data@2018/04/08
  author@344822559@qq.com
*/

// import MD5 from "md5";
var MD5 = require('md5.js');
// import CryptoJS from 'crypto-js';
import Axios from 'axios';
// import Jsonp from 'jsonp'
import AxiosConfig from '../api/axiosConfig'
import CommonParams from '../api/commonParams'
import qs from 'qs';
import Checks from './checkformat';
import store from '../store/store'
import Tools from '../functions/commonTools';

const functions={



  /*获取时间戳*/
  gettimestap:()=>{
    return new Date().getTime()
  },

  /*随机字符串*/
  randomChar:(len)=> {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },

  /*签名*/
  getsignature(secretKey,timestamp,nonce,content){
    return this.createdMd5(secretKey + timestamp + nonce + content);
  },

  setStore: (name, content)=>{
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  getStore : name => {
    if (!name) return false;
    return window.localStorage.getItem(name);
  },


  removeStore : name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  },


  setsessionStore : (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },

  getsessionStore : name => {
    if (!name) return;
    return window.sessionStorage.getItem(name);
  },

  removesessionStore : name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },


  createdMd5 : args => {
    args = args.toString(); /*转字符串*/
    let md5stream = new MD5();
    return md5stream.update(args).digest('hex');
  },

  /*数据序列化*/
  serializationData:obj=>{
    return qs.stringify(obj)
  },

  /*axios*/
  requestHttpMethods(url,data,commonParam=false,HttpMethod='post',config=AxiosConfig){
    var loading=Tools.getTost('正在加载中...')
    let formatHttp=HttpMethod.toLowerCase();
    var formatDate=commonParam?Object.assign({},CommonParams,data):data;
    if(formatHttp=='get'){
      formatDate={params:formatDate};
    }

    /*拦截header头,在此处可以调用vuex里的值*/
    // config.headers['userId']=store.state.userinfo.id;
    var instance = Axios.create(config);
    let HttpSendType=formatHttp=='post'?instance.post:instance.get;
    return HttpSendType(url,formatDate).then(res=>{
      loading.clear()
      return Promise.resolve(res.data)
    })
      .catch(err=>{
        Tools.TestTost(err)
      })
  },

  /*封装jsonp方法*/
  jsonpMethod(url,data,commonParam=true){

    let formatDate = commonParam ? Object.assign({}, CommonParams, data) : data;
    url += (url.indexOf('?') < 0 ? '?' : '&') + this.param(formatDate);
    return new Promise((resolve, reject) => {
      Jsonp(url, formatDate, (err, data) => {
        // 类似node的设计，如果err是null，表示成功，data是后端返回的数据
        if (!err) { resolve(data) } else { reject(err) }
      })
    })
  },
  /*jsonpurl格式化*/
  param(data){
    let url = ''
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : ''
      url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
  },

  /*
  methods:des加密
  message@明文
  key@约定秘钥
  */
  encryptByDES(message, key){
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();

  },

  /*
  methods:DES解密
  ciphertext@DES加密报文
  key@约定秘钥
  */
  decryptByDES(ciphertext, key){
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    const decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  /*获取当前元素的兄弟元素*/
  getCurrtParentNode(ev){
    ev.target.style.display='none';
    ev.target.nextElementSibling.focus();
  },
  /*del首页加载动画*/
  DelLoading(){
    var parent=document.getElementById("Loading");
    if(parent){
      parent.parentNode.removeChild(parent);
    }
  }

}

export default functions;
