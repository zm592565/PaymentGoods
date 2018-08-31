<template>
  <ul class="tabclass">
    <li v-if="classlist" v-for="(item,index) in classlist" @click.stop="checked(index)" :key="index" :class="{'active':index==active}">{{item.name}}</li>
  </ul>
</template>
<script>
export default {
  props:{
    classlist:{
      type:Array,
      default:function () {
        return []
      }
    },
    active:{
        type:Number
    }
  },
  methods:{
      /*返回当前选中的tab的index*/
    checked(index){
      this.$emit('activeindex',index)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~staticPath/css/var.styl"
.tabclass
  display flex
  flex-flow row nowrap
  justify-content center
  align-items center
  white-space nowrap
  background white
  bt-t(#E8E8E8)
  overflow-x auto
  position relative
  z-index 9
  li
    list-style none
    flex 1
    text-align center
    line-height 84px
    padding 0px 20px
    color #999999
    display inline-block
    &.active
      color #333333
      font-weight bolder
      position relative
      &:after
        position absolute
        content ""
        width 40%
        height 1px
        border-bottom 4px  solid #5B8AED
        left 50%
        margin-left -20%
        bottom 0px
        z-index 10

</style>
