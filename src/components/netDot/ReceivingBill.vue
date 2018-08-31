<template>
  <div id="box_content">
      <Header title="应付寄方货款账单" backstate searchState @search="$router.push({name:'search'})"></Header>
      <div class="header_titlebox">
          <p>全网(或江苏省或南京市或安徽合肥公司)</p>
          <div class="info_detail">
              <p><span>2018-07-31</span><cite @click="$Tools.TestTost('*应付货款=总货款金额-总中心手续费-派方手续费-总扫码付手续费')"></cite></p>
              <ul class="clearfix">
                  <li>应付寄方货款金额： ¥1915.3</li>
                  <li>总货款金额：¥1930</li>
                  <li>层总手续费：¥21</li>
                  <li>总派方手续费：¥10.5</li>
              </ul>
          </div>
      </div>
      <div class="main_box bg_white">
        <ul>
            <router-link tag="li" to="/netdetail">
                <span class="f_28">运单号：118112112497</span>
                <div class="text_r">
                    <h1 class="f_40">-56.00</h1>
                    <cite class="f_28 text_999">09:08:47</cite>
                </div>
            </router-link>
            <li>
                <span class="f_28">运单号：118112112497</span>
                <div class="text_r">
                    <h1 class="f_40">-56.00</h1>
                    <cite class="f_28 text_999">09:08:47</cite>
                </div>
            </li>
            <li>
                <span class="f_28">运单号：118112112497</span>
                <div class="text_r">
                    <h1 class="f_40">-56.00</h1>
                    <cite class="f_28 text_999">09:08:47</cite>
                </div>
            </li>
            <li>
                <span class="f_28">运单号：118112112497</span>
                <div class="text_r">
                    <h1 class="f_40">-56.00</h1>
                    <cite class="f_28 text_999">09:08:47</cite>
                </div>
            </li>
            <li>
                <span class="f_28">运单号：118112112497</span>
                <div class="text_r">
                    <h1 class="f_40">-56.00</h1>
                    <cite class="f_28 text_999">09:08:47</cite>
                </div>
            </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import Header from '@/components/common/header'
  import TabClass from '@/components/common/tabclass'
  import FunctionMethods from '@/mixins/functionMethods'
  export default {
    data(){
      return{
         tabactive:0,
         classlist:[{name:'总部代收账单',value:0},{name:'代收状态查询',value:1}]
      }
    },
    mixins:[FunctionMethods],
    mounted(){

    },
    methods:{
        getActiveTabindex(index){
            this.tabactive=index;
        }

    },
    components:{
        Header,
        TabClass,
        FunctionMethods
    }
  }

</script>
<style lang="stylus" scoped>
@import "~staticPath/css/theme.styl"
.main_box
  ul
    display inline-block
    width 100%
    box-sizing border-box
    li
      display flex
      flex-flow row nowrap
      bd-d(#e8e8e8)
      padding 32px
      span
        flex 1
.header_titlebox
  background white
  bt-t(#e8e8e8)
  p
    padding 24px 32px
    font-size 28px
  .info_detail
    background #f5f5f5
    p
      display flex
      flex-flow row nowrap
      justify-content space-between
      color #333
      span
        line-height 40px
      cite
        width 40px
        height 40px
        bg-image('./src/assets/img/money-question')
        background-size auto 100%
    ul
      display flex
      flex-flow row wrap
      justify-content flex-start
      align-items flex-start
      padding 0px 32px
      font-size 24px
      color #666
      text-align left
      li
        box-sizing border-box
        width 50%
        line-height 45px
        &:nth-child(2n)
          padding-left 20px
          text-align right


</style>

