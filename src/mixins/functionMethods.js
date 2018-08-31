/*公共方法类*/
const CommonMethods={
    created(){
        /*去除index加载动画*/
        this.$function.DelLoading()
    },
    filters:{
        /*转换日期格式2018-07-20 2018年7月20日*/
        changeDate:value=>{
            var str='';
            let dataArr=value.split('-');
            str=dataArr[0]+'年'+dataArr[1]+'月'+dataArr[2]+'日';
            return str
        }
    },
    methods:{
        checkedsendAreadata(res){
            if(res.provinceactive){
                this.sendprovince=res.provinceactive.fullName
            }
            if(res.cityactive){
                this.sendcity=res.cityactive.fullName
            }
            if(res.regionactive){
                this.sendarea=res.regionactive.fullName
            }
            this.checkedsendarea=this.sendprovince+'/'+this.sendcity+'/'+this.sendarea
            this.confirmarea();
        },
        /*省市区县选择*/
        confirmarea(){
            this.cancelarea();
        },

        cancelarea(){
            this.actionmenushow=false
        },

    }
}
export default CommonMethods