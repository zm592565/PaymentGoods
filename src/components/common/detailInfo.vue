<template>
  <div id="box_content">
      <Header title="详情信息" backstate chartstate askState @askalert="$Tools.TestTost('* 应付货款=总货款金额-派方手续费')"></Header>
      <div class="main_box bg_white">
          <div class="p_relative clearfix">
              <div class="map_box" id="container"></div>
              <div class="state_info" v-if="showinfo&&type=='net'" style="padding: 18px">
                  <div class="title f_28" style="padding-bottom: 0px">
                      <span>运单号：{{showinfo.BillCode}}</span>
                      <span class="text_FF6868">应付金额：{{showinfo.SiteAmount}}</span>
                  </div>
              </div>
              <div class="state_info" v-if="showinfo&&type=='company'">
                  <div class="title f_28">
                      <span>运单号：{{showinfo.BillCode}}</span>
                      <span class="text_FF6868">应付金额：{{showinfo.SiteAmount}}</span>
                  </div>
                  <ul class="clearfix f_24 text_666">
                      <li>
                          <span>总货款金额：¥{{showinfo.PaymentAmount}}</span>
                          <span>总手续费：¥{{showinfo.TotalFee}}</span>
                      </li>
                      <li>
                          <span>总派方手续费：¥{{showinfo.DeliveryFee}}</span>
                          <span>总寄方手续费：¥{{showinfo.SendFee}}</span>
                      </li>
                      <li>
                          <span>总中心手续费：¥{{showinfo.CenterFee}}</span>
                          <span>总中心应收手续费：¥{{showinfo.CenterFee}}</span>
                      </li>
                      <li>
                          <span>总扫码付手续费：¥{{showinfo.ScanCodeFee}}</span>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="state_box">
              <div class="showinfo"v-if="expresslist&&expresslist.length">
                      <div class="figure_box">
                          <div class="figure_state">
                              <dl v-for="(item,index) in expresssatelist" :key="index" :class="{'active':expressactive==index}">
                                  <dt>{{item.name}}</dt>
                                  <dd></dd>
                              </dl>
                          </div>
                      </div>
                      <ul class="infolist">
                          <li v-for="(item,index) in expresslist" :class="{'active':index===0}">
                              <div class="info_date">
                                  <h4>{{item.scanDate|fomartDate}}</h4>
                                  <p>{{item.scanDate|fomartDateHour}}</p>
                              </div>
                              <div class="info_detail">
                                  <h4>{{item.scanType}}</h4>
                                  <p>
                                      {{item.memo}}
                                  </p>
                              </div>
                          </li>
                      </ul>
              </div>
              <div v-else class="text_c text_999 f_24" style="padding: 20px">
                  暂无物流信息...
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import Header from '@/components/common/header'
  import TabClass from '@/components/common/tabclass'
  import FunctionMethods from '@/mixins/functionMethods'
  import {Detail} from '@/mixins/detailMixin'
  export default {
    mixins:[FunctionMethods,Detail],
    methods:{
        getActiveTabindex(index){
            this.tabactive=index;
        },
    },
    components:{
        Header,
        TabClass,
        FunctionMethods
    }
  }

</script>
<style lang="stylus" scoped>
@import "~staticPath/css/detail.styl"
</style>

