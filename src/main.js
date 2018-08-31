// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import * as FastClick from "fastclick"
import store from './store/store'
import App from './App'
import router from './router'
import './rem/rem'

import JsBridg from '@/functions/bridge'


import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  error:require('./assets/img/image@3x.png'),
  loading: require('./assets/img/image@3x.png')
})

import {Commpn_api} from '@/api/api';
import Functions from './functions/function.js'
import Tools from './functions/commonTools'
import CheckFomart from './functions/checkformat'
import './assets/css/base.styl'
import 'vant/lib/vant-css/index.css'


FastClick.attach(document.body)
Vue.prototype.$bridge = JsBridg
Vue.prototype.$function=Functions;
Vue.prototype.$Tools=Tools;
Vue.prototype.$Check=CheckFomart;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate(){
      var _self=this;
      /*获取登录信息*/
      this.$bridge.callHandler(
        'submitFromWeb'
        , ''
        , (responseData) => {
          let data1 = JSON.parse(responseData)
          this.$store.commit('saveLogininfo',data1.loginResp.employee);

              /*根据权限指定页面入口
                        * data1.loginResp.employee.companyCategoryCode---正式启用
                        *
                        * */
              switch (data1.loginResp.employee.companyCategoryCode){
                  case '总公司':
                  case '部门':
                      _self.$router.push({name:'company'})
                      break;
                  case '独立网点':
                      _self.$router.push({name:'home'})
                      break;
                  default:
                      _self.$Tools.TestTost('无访问权限...');
                      break
              }

        }
      );

      /*调用中国省区*/
      // this.$store.dispatch('searchArealist',{})
      //     .then(res=>{
      //         this.$store.commit('searchChinaArealist',res)
      //     })


      /*正式则删除*/
      // switch (store.state.userinfo.companyCategoryCode){
      //     case '总公司':
      //     case '部门':
      //         _self.$router.push({name:'company'})
      //         break;
      //     case '独立网点':
      //         _self.$router.push({name:'home'})
      //         break;
      //     default:
      //         _self.$Tools.TestTost('无访问权限...');
      //         break
      // }

  },
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
  components: { App },
  template: '<App/>'
})
