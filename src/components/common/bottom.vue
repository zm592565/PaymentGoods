<template>
  <div class="bottom_menu">
    <li v-if="menu" v-for="(item,index) in menu" @click="pathTo(item.path,index)" :class="[{'active fadeIn':index==activeindex}]">
      <div :class="['img'+index]"></div>
      <p>{{item.name}}</p>
    </li>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeindex:0,
      activerounter:'',
    }
  },
  props:{
    menu:{
      type:Array,
      default:function () {
        return [{name:'首页',path:'/home'},{name:'分类',path:'/home'},{name:'购物车',path:'/home'},{name:'订单',path:'/home'}]
      }
    }
  },
  watch:{
    '$route' (to, from) {
      this.activerounter=to.path;
      this.filterMenu(this.menu);
    }
  },
  mounted(){
    this.activerounter=this.$route.path;
    this.filterMenu(this.menu);
  },
  methods:{
    pathTo(path,index){
     this.activeindex=index;
     this.activerounter=path;
     this.$router.push({path:path})
    },
    /*底部导航重新设定*/
    filterMenu(obj){
      var _self=this;
      if(obj.length){
       for (let i=0;i<obj.length;i++){
          if(_self.activerounter==obj[i].path){
            _self.activeindex=i;
          }
       }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~staticPath/css/var.styl"
  .bottom_menu
    height 98px
    background #fff
    flexlevel()
    position relative
    &:after
      content: " ";
      position: absolute;
      left: 0;
      top: -1px;
      width: 100%;
      height: 1px;
      border-top:1px solid #f5f5f5;
      -webkit-transform: scaleY(.5);
      transform:scaleY(.5);
    li
      flex 1
      text-align center
      vertical-align middle
      font-size 14px
      list-style none
      height 98px
      overflow hidden
      box-sizing border-box
      display flex
      flex-flow column nowrap
      align-items center
      justify-content center
      div
        margin 0 auto;
        display block
        width 36px
        height 36px
      div.img0
        bg-image('./src/assets/img/materials_homecopy');
        background-size auto 100%
      div.img1
        bg-image('./src/assets/img/materials_classifycopy');
        background-size auto 100%
      div.img2
        bg-image('./src/assets/img/materials_shoppingcopy');
        background-size auto 100%
      div.img3
        bg-image('./src/assets/img/materials_mecopy');
        background-size auto 100%
      p
        font-size 24px
        color #E4E4E4
    .active
      color #FE7621
      div.img0
        bg-image('./src/assets/img/materials_home');
      div.img1
        bg-image('./src/assets/img/materials_classify');
      div.img2
        bg-image('./src/assets/img/materials_shopping');
      div.img3
        bg-image('./src/assets/img/materials_me');
      p
        color #FF7300
</style>
