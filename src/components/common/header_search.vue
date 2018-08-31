<template>
<div class="header_search">
  <div class="back" @click.stop="$router.go(-1)"></div>
  <div class="search_box">
    <form @submit.prevent="searching">
      <input type="search" v-model="searchValue" placeholder="请输入运单号查询">
    </form>
    <cite v-show="delBtn" @click.stop="searchValue=''"></cite>
  </div>
</div>
</template>
<script>
  export default {
    data(){
      return{
        searchValue:''
      }
    },
    computed:{
      delBtn(){
        if(this.searchValue&&this.searchValue.length){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      searching(){
        this.$emit('getSeachValue',this.searchValue)
      }
    }
  }

</script>
<style lang="stylus" scoped>
 @import "~staticPath/css/theme.styl";
.header_search
  padding 20px 32px
  display flex
  flex-flow row nowrap
  background #fff
  .back
    flex 0.1
    bg-image('./src/assets/img/back')
    height 64px
    background-position left center
    background-size 32px auto
  .search_box
    flex 0.9
    box-sizing border-box
    height 64px
    border-radius 8px
    overflow hidden
    display flex
    flex-flow row nowrap
    justify-content flex-start
    align-items center
    background #EFEFEF
    bg-image('./src/assets/img/materials_search')
    background-position 16px center
    background-size auto 60%
    padding-left 70px
    form
      flex 1
      height 60px
      input
        border none
        height 60px
        width 100%
        background transparent
    cite
      bg-image('./src/assets/img/close')
      width 60px
      height 60px
      margin-right 6px
      background-size auto 60%
</style>
