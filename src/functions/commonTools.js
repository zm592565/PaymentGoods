/*
* 常用工具类
* */
import { Toast,Dialog } from 'vant';
const commonTool={
    getTost:(msg='message',type='loading',duration=0)=>{
      var toast1 = Toast({
        type:type,
        loadingType: 'spinner',
        duration: duration,       // 持续展示 toast
        message: msg,
        orbidClick: false, // 禁用背景点击
      });
      return toast1
    },

  /*文字信息提示*/
  TestTost(msg,position='bottom',duration=3000){
    var toast1 = Toast({
      position:position,
      duration: duration,       // 持续展示 toast
      message: msg,
    });
    return toast1
  },

  /*alert*/
  AlertTost(msg,fn=function(){}){
    Dialog.alert({
      message: msg
    }).then(() => {
      fn()
    });
  },
  ConfirmTost(message,title='提示'){
   return Dialog.confirm({
      title: title,
      message: message
    })
  }





}
export default commonTool
