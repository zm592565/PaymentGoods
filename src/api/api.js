/*静态常量*/
// export const BASE_URL='https://appsys.sto.cn/'/*生产环境*/;
// export const BASE_URL='http://192.168.124.208:8080/';/*内网*/
export const BASE_URL='http://222.72.44.130:19999/';/*对应外网测试*/


export const APP_ID='app';
export const APP_SOURCE='jn';
export const APP_CLIENTTYPE='h5';

export const PageApi={
  /*检索*/
  search:'face-kdzs/order/getTraceListByWaybillNo',


  /*总部代收账单汇总*/
  companyBill:'/face-jn/center/getSumByHead',

  /*总部代收明细*/
  companyDetail:'/face-jn/center/getListByHead',

  /*总部代收状态列表*/
  companyPayList:'/face-jn/center/getHeadListByStatus',


  /*网点*/
  /*网点账单汇总*/
  netDotBill:'/face-jn/site/getSumBySite',

  /*网点代收状态列表*/
  netPaylist:'/face-jn/site/getListByStatus',



  /*根据运单查订单性情*/
  orderInfo:'/face-jn/center/getByBillCode'


}

/*通用接口*/
export const Common_API={

  /*上传文件生产域名*/
  uploadUrl:'https://appfileupload.sto.cn/',

  /*根据父id来检索行政区*/
  Chinaarealist:'region/searchByParentId/',

  /*快速检索组织机构*/
  SearchBaseOrganize:'face-app/basicInfo/fuzzySearchBaseOrganizeFromEs',


  /*上传图片api*/
  uploadPic:'upload/picture',/*生产*/
  // uploadPic:'http://222.72.44.130:8092/upload/picture',/*测试*/


  /*组装的外网域名*/
  netUrl:'https://appfiledownload.sto.cn/',/*生产*/
  // netUrl:'http://222.72.44.130:22222/dfs/',/*测试*/


}














