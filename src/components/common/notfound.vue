<!--没有内容-->
<template>
  <div class="notfound">
    <div class="notresicon"></div>
    <p class="f_28 text_999 pt_20 text_c">{{textinfo}}</p>
  </div>
</template>
<script>
  export default {
    props:{
      textinfo:{
        type:String,
        default:'暂无相关内容~'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~staticPath/css/theme.styl";
  @import "~staticPath/css/common.styl";
  .notfound
    width 100%
    height 100%
    box-sizing border-box
    display flex
    flex-flow column nowrap
    justify-content center
    align-items center
  .notresicon
    width 150px
    height 150px
    bg-image('./src/assets/img/Nologs');
    background-size cover
    margin-top -30%
</style>
