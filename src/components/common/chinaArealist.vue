<template>
  <div class="areabox">
      <div v-if="choseedstate" class="choosetitle chooseactive">{{choseactivetitle}}</div>
      <div v-if="choseedstate" class="choseactive-box">
        <span v-if="provinceactive" :class="{'active':provincestate}" @click="activeCheckedTitle('province')">{{provinceactive|checkedfileter}}</span>
        <span v-if="cityactivechecked" :class="{'active':citystate}" @click="activeCheckedTitle('city')">{{cityactive|checkedfileter}}</span>
        <span v-if="regionactivechecked" :class="{'active':regionstate}" @click="activeCheckedTitle('region')">{{regionactive|checkedfileter}}</span>
      </div>
      <div class="choosetitle">{{chosetext}}</div>
      <ul class="arealist" v-if="provincestate">
        <li v-for="(item,index) in provincelist" @click="searchcity(item.id,index,'city')">{{item.fullName}}</li>
      </ul>
      <ul class="arealist" v-if="citystate">
        <li v-for="(item,index) in citylist" @click="searchcity(item.id,index,'region')">{{item.fullName}}</li>
      </ul>
      <ul class="arealist" v-if="regionstate">
        <li v-for="(item,index) in regionlist" @click="searchcity(item.id,index,'')">{{item.fullName}}</li>
      </ul>
  </div>
</template>
<script>

export default {
  data(){
    return{
      chosetext:'选择省份',
      choseactivetitle:'已选',

      choseedstate:false,/*已选框显示*/

      provincelist:[],/*省区列表*/
      provincestate:true,
      citylist:[],/*市区列表*/
      citystate:false,
      cityactivechecked:true,
      regionlist:[],/*区列表*/
      regionstate:false,
      regionactivechecked:false,

      provinceactive:null,/*已选省*/
      cityactive:null,/*已选市*/
      regionactive:null,/*已选区*/

    }
  },
  created(){
    if(Array.isArray(this.$store.state.chinaProvince)&&this.$store.state.chinaProvince.length){
      this.provincelist=this.$store.state.chinaProvince;
    }
  },
  filters:{
    checkedfileter(value){
      if(value){
        return value.fullName
      }else{
        return '请选择'
      }
    }

  },
  methods:{
    searchcity(id,index,type='province'){
      this.choseedstate=true;
      switch (type){
        case 'province':
          this.provincelist=this.$store.state.chinaProvince;
          break;
        case 'city':
          this.chosetext='选择市区'
          this.citylist=[];
          this.regionlist=[];
          this.cityactivechecked=true;
          this.provinceactive=this.provincelist[index];
          this.$store.dispatch('searchArealist',{parentId:id})
            .then(res=>{
              this.citylist=res;
              this.provincestate=false;
              this.citystate=true;
              this.regionstate=false;
            })
          break;
        case 'region':
          this.chosetext='选择区县';
          this.cityactive=this.citylist[index]
          this.cityactivechecked=true;
          this.regionactivechecked=true;
          this.regionlist=[];
          this.$store.dispatch('searchArealist',{parentId:id})
            .then(res=>{
              this.regionlist=res;
              this.provincestate=false;
              this.citystate=false;
              this.regionstate=true;
            })
          break
        default:
          this.regionactive=this.regionlist[index];
          this.$emit('submitarea',{provinceactive:this.provinceactive,cityactive:this.cityactive,regionactive:this.regionactive});
          this.resetData();
          break;
      }
    },

    resetData(){
      this.choseedstate=false
      this.provincestate=true;
      this.citylist=[]/*市区列表*/
      this.citystate=false
      this.cityactivechecked=true,
      this.regionlist=[]/*区列表*/
      this.regionstate=false
      this.regionactivechecked=false

      this.provinceactive=null/*已选省*/
      this.cityactive=null/*已选市*/
      this.regionactive=null/*已选区*/
    },

    activeCheckedTitle(type){
      switch (type){
        case 'province':
          this.chosetext='选择省';
          this.cityactive=null;
          this.provincestate=true;
          this.citystate=false;
          this.cityactivechecked=false;
          this.regionactivechecked=false
          this.regionstate=false;
          break;
        case 'city':
          this.chosetext='选择市区';
          this.regionactive=null;
          this.cityactivechecked=true;
          this.regionactivechecked=false
          this.provincestate=false;
          this.citystate=true;
          this.regionstate=false;
          break;
      }
    }
  }


}
</script>
<style lang="stylus" scoped>
  .areabox
    padding 20px 0px
    .choosetitle
      border-left 4px solid #333333
      padding-left 32px
      margin-bottom 20px
    .chooseactive
      border-left 4px solid #FE7621
      color #FE7621
    .choseactive-box
      background #F6F6F6
      height 98px
      margin-bottom 20px
      display flex
      flex-flow row nowrap
      justify-content flex-start
      align-items center
      span
        height 98px
        line-height 98px
        padding 0px 20px
        text-align center
        position relative
        &.active
          color #FE7621
        &.active::after
          position absolute
          content ""
          left 30%
          right 30%
          bottom 0px
          height 2px
          background #FE7621
    .arealist
      display flex
      flex-flow row wrap
      justify-content flex-start
      align-items flex-start
      li
        width 25%
        font-size 24px
        line-height 60px;
        height 60px;
        padding 10px;
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        text-align center
        box-sizing border-box


</style>
