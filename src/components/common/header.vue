<template>
  <div id="header" :style="{backgroundColor:bg,color:textColor}">
    <div class="header_box">
      <div class="back">
        <slot name="left">
          <slot name="backbutton">
            <span v-if="backstate" @click="back" class="backicon"></span>
            <span v-if="backwhitestate" @click="back" class="backicon_white"></span>
          </slot>
          <span v-if="closestate" @click="close" class="closeicon"></span>
          <span v-if="closewhitestate" @click="close" class="closeswhiteicon"></span>
        </slot>
      </div>
      <div class="title">
        <slot>{{title}}</slot>
      </div>
      <div class="menu">
        <slot name="right">
          <span v-if="chargedetails" @click="details" class="logicon"></span>
          <span v-if="searchState" @click="search" class="searchicon"></span>
          <span v-if="timeicon" @click="timealert" class="timeicon"></span>
          <span v-if="askState" @click="askalert" class="askicon"></span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{}
    },
    props:{
      backstate:{
        type:Boolean,
        default:false
      },
      backwhitestate:{
        type:Boolean,
        default:false
      },
      closestate:{
        type:Boolean,
        default:false
      },
      closewhitestate:{
        type:Boolean,
        default:false
      },
      chartstate:{
        type:Boolean,
        default:false
      },
      searchState:{
        type:Boolean,
        default:false
      },
      askState:{
          type:Boolean,
          default:false
      },
      title:{
        type:String
      },
      bg:{
        type:String,
        default:"white"
      },
      textColor:{
        type:String,
        default:'#333'
      },
      leftcontent:{
        type:String
      },
      chargedetails:{
        type:Boolean,
        default:false
      },
      timeicon:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      close(){
        this.$bridge.callHandler(
          'finishBridge'
          ,''
        )
      },
      search(){
       this.$emit('search')
      },
      details(){
        this.$emit('chartdetail')
      },
      timealert(){
        this.$emit('openpop')
      },
      askalert(){
         this.$emit('askalert')
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~staticPath/css/var.styl"
  #header
    /*padding-top 20px*//*在需要做沉浸式的时候开启*/
    padding-top 0px
    position relative
    box-sizing border-box
    position relative
    .header_box
      height 90px
      font-size 28px
      padding 0px 20px
      flexlevel();
    .title
      flex:1;
      font-size 32px
      text-align center
    .back
      width 200px
      text-align left
      display flex
      height 100%
      flex-flow nowrap row
      justify-content flex-start
      align-items center
      .backicon
        bg-image('./src/assets/img/back')
        height 100%
        width 80px
        background-size 32px auto
      .backicon_white
        bg-image('./src/assets/img/back_white')
        height 100%
        width 80px
        background-size 32px auto
      .closeicon
        width 80px
        height 100%
        bg-image('./src/assets/img/fork')
        background-size auto 32px
      .closeswhiteicon
        width 80px
        height 100%
        bg-image('./src/assets/img/close_white')
        background-size auto 32px
    .menu
      width 200px
      text-align left
      display flex
      flex-flow nowrap row
      justify-content flex-end
      align-items center
      text-align right
      .searchicon
        width 80px
        bg-image('./src/assets/img/search')
        background-size 50% auto
        height 80px
      .logicon
        width 80px
        bg-image('./src/assets/img/site_chargedetails')
        background-size 50% auto
        height 80px
      .timeicon
        width 80px
        bg-image('./src/assets/img/site_time')
        background-size 50% auto
        height 80px
      .askicon
        width 80px
        bg-image('./src/assets/img/money-question')
        background-size 50% auto
        height 80px
</style>
