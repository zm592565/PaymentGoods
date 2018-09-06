<template>
    <div id="box_content">
        <Header title="收款日期选择" backstate></Header>
        <div class="main_box">
            <DateChecked @getActiveDate="getDate" :list="list"></DateChecked>
            <div class="submit-box">
                <div>重置</div>
                <div class="active">查询</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '@/components/common/header'
    import DateChecked from '@/components/common/date-checked'
    export default {
        data(){
            return{
                list:[{name:'开始日期',value:'请选择',time:''},{name:'结束日期',value:'请选择',time:''}]
            }
        },
        methods:{
            getDate(obj){
                var dateValue=this.$Check.gettimeformate(obj.value,true)
                var objs={name:this.list[obj.activeIndex].name,value:dateValue,time:obj.value};
                this.$set(this.list,obj.activeIndex,objs);
            },

        },
        components:{
            Header,
            DateChecked
        }
    }
</script>
<style lang="stylus" scoped>
.submit-box
    display flex
    flex-flow row nowrap
    justify-content space-between
    align-items center
    height 90px
    background #D8D8D8
    color #666
    font-size 32px
    line-height 90px
    div
        flex 1
        text-align center
        &.active
            background #5B8AED
            color white

</style>