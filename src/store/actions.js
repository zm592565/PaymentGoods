import functions from "../functions/function";
import Tools from '../functions/commonTools';
import {PageApi,Common_API} from "../api/api";
const action={
  checkExpress(context,waybillNo){
    return functions.requestHttpMethods(PageApi.search,{waybillNo:waybillNo},false,'get')
      .then(res=>{
          if(res.respCode=='000'){
            return Promise.resolve(res.data)
          }else{
            Tools.TestTost(res.resMessage)
          }
      })

  },

    /*检索省市区县根据父id*/
    searchArealist(context,{parentId=86}){
        /*axios配置*/
        // let obj={
        //     baseURL: Common_API.uploadUrl,/*测试接口地址*/
        //     retry: 4,
        //     retryDelay: 1000,
        //     timeout: 20000,
        //     withCredentials:true,
        //     headers: {'Content-Type': 'application/json','source':'jn','clientType':'H5'},
        // }
        return functions.requestHttpMethods(Common_API.Chinaarealist+parentId,null,false,'get')
            .then(res=>{
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('省市数据获取失败...')
                }
            })
    },


    /*总部代收账单汇总*/
    getCompanyBillAll(context,{siteId,beginTime,endTime,province,city}){
        return functions.requestHttpMethods(PageApi.companyBill,{siteId,beginTime,endTime,province,city},false,'get')
            .then(res=>{
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('数据获取失败...')
                }
            })

    },

    /*总部代收状态列表*/
    getListCompany(context,{siteId,beginTime,endTime,province,city,pageSize,pageNo,timeType,status}){
        return functions.requestHttpMethods(PageApi.companyPayList,{siteId,beginTime,endTime,province,city,pageSize,pageNo,timeType,status},false,'get')
            .then(res=>{
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('数据获取失败...')
                }
            })
    },





    /********网点********/
    getNetDotBill(context,{siteId,beginTime,endTime}){
        return functions.requestHttpMethods(PageApi.netDotBill,{siteId,beginTime,endTime},false,'get')
            .then(res=>{
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('数据获取失败...')
                }
            })
    },

    /*网点代收状态列表*/
    getListNetDot(context,{siteId,beginTime,endTime,province,city,pageSize,pageNo,timeType,status}){
        return functions.requestHttpMethods(PageApi.netPaylist,{siteId,beginTime,endTime,pageSize,pageNo,timeType,status},false,'get')
            .then(res=>{
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('数据获取失败...')
                }
            })
    },




    /*根据运单查订单详情*/
    getOrderInfo(context,{billCode,siteType='S'}){
        return functions.requestHttpMethods(PageApi.orderInfo,{billCode,siteType},false,'get')
            .then(res=>{
                console.info(res,'运单详情')
                if(res.respCode=='000'){
                    return Promise.resolve(res.data)
                }else{
                    Tools.TestTost('数据获取失败...')
                }
            })

    }




}
export default action;
