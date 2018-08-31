<template>
    <div class="bg_white">
        <van-cell-group>
            <van-cell is-link v-if="list" v-for="(item,index) in list" :title="item.name" :value="item.value" @click="showAction(index)" :key="index" />
        </van-cell-group>
        <van-actionsheet  v-model="show">
            <van-datetime-picker @confirm="confirm" @cancel="cancel" v-model="currentDate"  type="date"  :min-date="minDate" :max-date="maxDate" />
        </van-actionsheet>
    </div>
</template>
<script>
    import { Cell, CellGroup,DatetimePicker,Actionsheet } from 'vant';
    export default {
        data(){
            return{
                show:false,
                active:0,/*当前点击的cell*/
                currentDate: new Date(),
                minDate: new Date(new Date().getFullYear()-1,0,1),
                maxDate:new Date(),
            }
        },
        props:{
           list:{
               type:Array,
               default:function () {
                   return [{name:'开始日期',value:'请选择'},{name:'结束日期',value:'请选择'}]
               }
           }
        },
        watch:{
            'list':function (value) {
                let state=this.checkedDate();
                if(state){
                    let obj={name:this.list[this.active].name,value:'请选择',time:''}
                    this.$set(this.list,this.active,obj);
                    var warningText='开始日期不得大于结束日期,且只支持检索5天内数据！';
                    this.$Tools.TestTost(warningText);
                }
            }
        },
        methods:{
            showAction(index){
                this.show=true;
                this.currentDate=new Date()
                this.active=index;
            },
            checkedDate(){
                var _self=this;
                var back=false;
                if(this.list[0].time&&this.list[1].time){
                    let minDay=this.$Check.getNumDays(_self.list[1].time,-7);/*根据当前选定的结束日期推算5天前的日期*/
                    let startDay=new Date(_self.list[0].time).getTime();/*跟现在的开始时间做比对*/
                    let endDay=new Date(_self.list[1].time).getTime();
                    if(startDay>endDay){
                        this.$Tools.TestTost('开始日期不得大于结束日期!');
                        back=true;
                    }
                    if(startDay<new Date(minDay).getTime()){
                        this.$Tools.TestTost('只支持检索5天内数据!');
                        back=true;
                    }
                }
                return back
            },
            confirm(value){
                let state=this.checkedDate();
                if(state){
                    return false
                }
                this.show=false;
                var _self=this;
                /*动态设置title里面的*/
                this.$emit('getActiveDate',{value,activeIndex:_self.active})
            },
            cancel(){
                this.show=false;
            }
        },
        components:{
            'van-cell-group':CellGroup,
            'van-cell':Cell,
            'van-datetime-picker':DatetimePicker,
            'van-actionsheet':Actionsheet
        }
    }
</script>
<style lang="" scoped>

</style>