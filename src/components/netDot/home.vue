<template>
<transition name="slide">
  <div id="box_content">
      <Header title="代收货款" closestate></Header>
      <TabClass :classlist="classlist" :active="tabactive" @activeindex="getActiveTabindex"></TabClass>
      <div class="main_box" ref="main_box">
          <div class="datainfo_box" v-show="tabactive===0">
              <div class="headerTool">
                  <div class="user_info">
                      <h1 class="f_48">您好,</h1>
                      <p class="f_32">{{$store.state.userinfo.companyName}}</p>
                  </div>
                  <!--<div class="tools_btn">-->
                      <!--&lt;!&ndash;<li class="tool" @click="actionmenushow=true"></li>&ndash;&gt;-->
                      <!--&lt;!&ndash;<li class="date" @click="$router.push({name:'selectdate'})"></li>&ndash;&gt;-->
                      <!--<li class="tool" @click="$router.push({name:'noopen'})"></li>-->
                      <!--<li class="date" @click="$router.push({name:'noopen'})"></li>-->
                  <!--</div>-->
              </div>
              <div class="text_white show_box f_28">
                  <h1 class="f_48">{{allCount}}</h1>
                  <p class="f_28 text_c">网点总票数</p>
              </div>
              <!--<router-link tag="div" to="/receivingbill" class="row_box">-->
              <div class="row_box">
                  <div>
                      <h1 class="f_48 text_main"><cite class="pr_10 f_24">¥</cite><span class="f_bold">{{SendAmount}}</span></h1>
                      <p class="f_24">
                          应<cite class="text_main">收</cite>中心货款金额
                      </p>
                  </div>
                  <div>
                      <p class="f_28">
                         <cite>票数：</cite><span>{{SendCount}}</span>
                      </p>
                      <p class="f_24 text_999 pt_20">{{endTime|changeDate}}</p>
                  </div>
              </div>
              <div class="row_box">
                  <div>
                      <h1 class="f_48 text_main"><cite class="pr_10 f_24">¥</cite><span class="f_bold">{{DeliveryAmount}}</span></h1>
                      <p class="f_24">
                          应<cite class="text_main">付</cite>中心货款金额

                      </p>
                  </div>
                  <div>
                      <p class="f_28">
                          <cite>票数：</cite><span>{{DeliveryCount}}</span>
                      </p>
                      <p class="f_24 text_999 pt_20">{{endTime|changeDate}}</p>
                  </div>
              </div>
          </div>


          <div class="collectingSearch" ref="collectingSearch" v-show="tabactive===1">
              <div class="searchHeader clearfix" ref="searchHeader">
                  <TabClass :classlist="searchlist" :active="tabsearchactive" @activeindex="getActiveSearchindex"></TabClass>
                  <ul class="allinfo">
                      <li><span>寄件日期:{{searchbeginTime}}</span>
                          <cite class="date" @click="$router.push({name:'noopen'})"></cite>
                      </li>
                      <li class="text_666" v-if="tabsearchactive==0&&allinfo"><span class="f_24">货款总金额：{{allinfo.TotalAmoun}}</span><span class="f_24">总票数：{{allinfo.RecordCount}}</span></li>
                      <li class="text_666" v-if="tabsearchactive==1&&receiveinfo"><span class="f_24">货款总金额：{{receiveinfo.TotalAmoun}}</span><span class="f_24">总票数：{{receiveinfo.RecordCount}}</span></li>
                      <li class="text_666" v-if="tabsearchactive==2&&collectedinfo"><span class="f_24">货款总金额：{{collectedinfo.TotalAmoun}}</span><span class="f_24">总票数：{{collectedinfo.RecordCount}}</span></li>
                      <li class="text_666" v-if="tabsearchactive==3&&returninfo"><span class="f_24">货款总金额：{{returninfo.TotalAmoun}}</span><span class="f_24">总票数：{{returninfo.RecordCount}}</span></li>
                  </ul>
              </div>

              <div class="list_box" ref="list_box">
                  <vue-better-scroll v-if="tabsearchactive==0" ref="scroll" style="height: 100%" :scrollbar="scrollbarObj"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="allpullUpLoadObj" :startY="parseInt(startY)"  @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                      <router-link tag="li" :to="{name:'detail',query:{billCode:item.BillCode,type:'net'}}" v-if="alllist" v-for="(item,index) in alllist" :key="index">
                          <div :class="['tag_box',{'get_box':item.SiteType=='派'},{'send_box':item.SiteType=='寄'}]"></div>
                          <div class="tag">
                              <div>
                                  <p class="f_28 text_333">运单号：{{item.BillCode}}</p>
                                  <cite v-if="item.PayType">{{item.PayType}}</cite>
                              </div>
                              <span>
                                  <p class="f_40 text_333 pb_10">{{item.PaymentAmount}}</p>
                                  <p :class="['f_24','text_r',{'text_FF964D':item.Status=='未收款'},{'text_FF6868':item.Status=='已返款'},{'text_3196FA':item.Status=='派方已收'}]">{{item.Status}}</p>
                              </span>
                          </div>
                      </router-link>
                      <div v-if="tabsearchactive==0&&allpagestate" style="font-size: 12px;text-align: center;color: #999;padding-top: 20px;padding-bottom: 20px">没有更多了...</div>
                  </vue-better-scroll>


                  <vue-better-scroll v-if="tabsearchactive==1" ref="scroll" style="height: 100%" :scrollbar="scrollbarObj"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="receiveNotpullUpLoadObj" :startY="parseInt(startY)"  @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                      <router-link tag="li" :to="{name:'detail',query:{billCode:item.BillCode,type:'net'}}" v-if="receiveNotlist" v-for="(item,index) in receiveNotlist" :key="index">
                          <div :class="['tag_box',{'get_box':item.SiteType=='派'},{'send_box':item.SiteType=='寄'}]"></div>
                          <div class="tag">
                              <div>
                                  <p class="f_28 text_333">运单号：{{item.BillCode}}</p>
                                  <cite v-if="item.PayType">{{item.PayType}}</cite>
                              </div>
                              <span>
                                  <p class="f_40 text_333 pb_10">{{item.PaymentAmount}}</p>
                                  <p :class="['f_24','text_r',{'text_FF964D':item.Status=='未收款'},{'text_FF6868':item.Status=='已返款'},{'text_3196FA':item.Status=='派方已收'}]">{{item.Status}}</p>
                              </span>
                          </div>
                      </router-link>
                      <div v-if="tabsearchactive==1&&receiveNotpagestate" style="font-size: 12px;text-align: center;color: #999;padding-top: 20px;padding-bottom: 20px">没有更多了...</div>
                  </vue-better-scroll>

                  <vue-better-scroll v-if="tabsearchactive==2" ref="scroll" style="height: 100%" :scrollbar="scrollbarObj"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="collectedpullUpLoadObj" :startY="parseInt(startY)"  @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                      <router-link tag="li" :to="{name:'detail',query:{billCode:item.BillCode,type:'net'}}" v-if="collectedlist" v-for="(item,index) in collectedlist" :key="index">
                          <div :class="['tag_box',{'get_box':item.SiteType=='派'},{'send_box':item.SiteType=='寄'}]"></div>
                          <div class="tag">
                              <div>
                                  <p class="f_28 text_333">运单号：{{item.BillCode}}</p>
                                  <cite v-if="item.PayType">{{item.PayType}}</cite>
                              </div>
                              <span>
                                  <p class="f_40 text_333 pb_10">{{item.PaymentAmount}}</p>
                                  <p :class="['f_24','text_r',{'text_FF964D':item.Status=='未收款'},{'text_FF6868':item.Status=='已返款'},{'text_3196FA':item.Status=='派方已收'}]">{{item.Status}}</p>
                              </span>
                          </div>
                      </router-link>
                      <div v-if="tabsearchactive==2&&collectedpagestate" style="font-size: 12px;text-align: center;color: #999;padding-top: 20px;padding-bottom: 20px">没有更多了...</div>
                  </vue-better-scroll>

                  <vue-better-scroll v-if="tabsearchactive==3" ref="scroll" style="height: 100%" :scrollbar="scrollbarObj"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="returnpullUpLoadObj" :startY="parseInt(startY)"  @pullingDown="onPullingDown" @pullingUp="onPullingUp">
                      <router-link tag="li" :to="{name:'detail',query:{billCode:item.BillCode,type:'net'}}" v-if="returnlist" v-for="(item,index) in returnlist" :key="index">
                          <div :class="['tag_box',{'get_box':item.SiteType=='派'},{'send_box':item.SiteType=='寄'}]"></div>
                          <div class="tag">
                              <div>
                                  <p class="f_28 text_333">运单号：{{item.BillCode}}</p>
                                  <cite v-if="item.PayType">{{item.PayType}}</cite>
                              </div>
                              <span>
                                  <p class="f_40 text_333 pb_10">{{item.PaymentAmount}}</p>
                                  <p :class="['f_24','text_r',{'text_FF964D':item.Status=='未收款'},{'text_FF6868':item.Status=='已返款'},{'text_3196FA':item.Status=='派方已收'}]">{{item.Status}}</p>
                              </span>
                          </div>
                      </router-link>
                      <div v-if="tabsearchactive==3&&returnpagestate" style="font-size: 12px;text-align: center;color: #999;padding-top: 20px;padding-bottom: 20px">没有更多了...</div>
                  </vue-better-scroll>
                  <li>
                      <div class="tag_box get_box">1321</div>
                  </li>

              </div>

          </div>


      </div>


      <van-actionsheet v-model="actionmenushow" title="选择省市区县">
          <areaComponets @submitarea="checkedsendAreadata"></areaComponets>
      </van-actionsheet>

    </div>
</transition>
</template>
<script>
  import Header from '@/components/common/header'
  import TabClass from '@/components/common/tabclass'
  import FunctionMethods from '@/mixins/functionMethods'
  import {NetDotMixin} from '@/mixins/homeMixin'
  import areaComponets from '@/components/common/chinaArealist'
  import {Actionsheet} from 'vant';
  import VueBetterScroll from 'vue2-better-scroll'
  export default {
    data(){
      return{
         tabactive:0,

         /*可以用来选择地区暂未开放*/
         actionmenushow: false,
         sendprovince:'',
         sendcity:'',
         sendarea:'',

         checkedsendarea:'',
         classlist:[{name:'网点代收账单',value:0},{name:'代收状态查询',value:1}],

          SendAmount:0,
          SendCount:0,
          DeliveryAmount:0,
          DeliveryCount:0,

      }
    },
    mixins:[FunctionMethods,NetDotMixin],

    components:{
        Header,
        TabClass,
        FunctionMethods,
        areaComponets,
        VueBetterScroll,
        'van-actionsheet':Actionsheet
    }
  }

</script>
<style lang="stylus" scoped>
  @import "~staticPath/css/home.styl";
.main_box
  overflow-y auto
</style>

