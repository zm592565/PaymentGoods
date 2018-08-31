<template>
    <vue-better-scroll ref="scroll" style="height: 100%;position: relative;overflow: auto" :scrollbar="scrollbarObj"  :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)"  @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <slot name="list">dsad</slot>
    </vue-better-scroll>
</template>
<script>
  import VueBetterScroll from 'vue2-better-scroll'
  import Notfound from '@/components/common/notfound';
export default {
  /*
  * 加入购物车逻辑
  * 在传入的list列表里如果num的值大于1就找到这个list列表给里面新增一个字段num 设置成我们的添加到购物车里的数字
  * 然后独立一个购物车的存储系统存进去，最好是存在状态管理里
  * */
  data(){
    return{
      startY: 0,  // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 500,
      scrollbarObj:false,
    }
  },
  props:{
    deafaultpages:0,
    deafaultpagestate:{
      type:Boolean,
      default:false
    },
    pageNum:1,
    pageSize:20,
    pullDownRefreshObj:{
      type:Object,
      default:function () {
        return  {
          threshold: 50,
          stop: 0
        }
      }
    },
    pullUpLoadObj:{
      type:Object,
      default:function () {
        return  {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
      }
    }
  },
  mounted(){
      this.onPullingUp();
  },
  methods:{
    onPullingDown(){
        alert('cc')

//      this.$emit('PullingDown')
    },
    onPullingUp(){

//        this.$emit('PullingUp')
    }
  },
  components:{
    VueBetterScroll,
    Notfound,
  }
}
</script>
<style lang="stylus" scoped>
  @import "~staticPath/css/theme"
.homelist
  height 100%
  position relative


</style>
