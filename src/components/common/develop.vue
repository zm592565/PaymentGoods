<template>
  <transition name="slide">
    <div id="box_content">
      <Header :title="title" backstate></Header>
      <div class="main_box">
          <div class="content">
            <div class="img_warp"></div>
            <p>程序小哥正在开发中，敬请期待…</p>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
    import Header from '@/components/common/header'
export default {
  data(){
    return {
      title: '系统开发中',
    }
  },
  methods:{
    back(){
      this.$router.back('-1')
    }
  },
  components: {
      Header
  }
}
</script>

<style lang="stylus" scoped>
@import "~staticPath/css/var"
  .content
    height 100%
    width: 100%
    bt-t(#E8E8E8)
    background: #ffffff
    display: flex
    align-items: center
    flex-flow: column nowrap
    justify-content: center
    .img_warp
      width: 298px
      height: 338px
      bg-image('./src/assets/img/kaifazhong')
      background-size: auto 100%
      margin-top: -120px
    p
      font-size: 24px
      color: #999
      text-align center
      padding-left 30px
      margin-top: 60px
</style>
