import state from "./state";
import Check from '../functions/checkformat';
const mutations={
   indexMu:function (state) {
     state.num++
   },

  /*存储类别*/
  saveGoodsType:(state,data)=>{
    if(Array.isArray(data)){
      state.goodsType= Check.checkFormatGoods(data);
    }
  },

  /*存储材质*/
  saveBaletexture:(state,data)=>{
    if(Array.isArray(data)){
      state.bale_texture= Check.checkFormatGoods(data);
    }
  },

  /*存储中国省区大类*/
  searchChinaArealist:(state,data)=>{
    state.chinaProvince=data;
  },

  /*临时存储首页检索条件*/
  saveHomeSearchInfo:(state,obj=null)=>{
    state.homesearch=obj;
  },

  /*记录登录信息*/
  saveLogininfo(state,obj){
    state.userinfo=obj;
  }


}
export default mutations
