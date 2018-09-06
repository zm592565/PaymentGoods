/*总部home*/
export const CompanyMixin={
    data(){
        return{
            SendAmount:0,
            SendCount:0,
            DeliveryAmount:0,
            DeliveryCount:0,
            beginTime:this.$Check.gettimeformate(),/*开始和结束默认是今日，正式环境需改,this.$Check.gettimeformate()*/
            endTime:this.$Check.gettimeformate(),
            homeprovince:'',
            homecity:'',

            /*总部代收状态列表属性*/
            tabsearchactive:0,
            searchprovince:'',
            searchcity:'',
            searchbeginTime:this.$Check.gettimeformate(),
            searchendTime:this.$Check.gettimeformate(),

            // searchbeginTime:'2017-07-24',
            // searchendTime:'2017-07-24',

            searchstatus:-1,
            searchtimeType:'S',


            pageSize:20,
            startY: 0,  // 纵轴方向初始化位置
            scrollToX: 0,
            scrollToY: 0,
            scrollToTime: 500,
            scrollbarObj: false,
            pullDownRefreshObj: {
                threshold: 50,
                stop: 0
            },


            allinfo:null,/*全网基本信息 票数什么的*/
            alllist:[],
            allpageSize:1,
            allpagestate:false,
            /*全部*/
            allpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*未收款*/
            receiveinfo:null,/*全网基本信息 票数什么的*/
            receiveNotlist:[],
            receiveNotpageSize:1,
            receiveNotpagestate:false,
            receiveNotpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*派方已收*/
            collectedinfo:null,/*全网基本信息 票数什么的*/
            collectedlist:[],
            collectedpageSize:1,
            collectedpagestate:false,
            collectedpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*已返款*/
            returninfo:null,/*全网基本信息 票数什么的*/
            returnlist:[],
            returnpageSize:1,
            returnpagestate:false,
            returnpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },
        }
    },
    created(){
        this.getsearchToday();

    },

    watch:{
        'tabactive':function (value) {
            if(value===0){
                this.getsearchToday();
            }
        }
    },

    computed:{
        allCount:function(){
            return this.SendCount+this.DeliveryCount;
        }
    },
    methods:{

        /*查询今日数据*/
        getsearchToday(){
            /*默认查今日的数据*/
            this.$store.dispatch('getCompanyBillAll',{siteId:this.$store.state.userinfo.companyid,beginTime:this.beginTime,endTime:this.endTime,province:this.homeprovince,city:this.homecity})
                .then(res=>{
                    this.SendAmount=res.SendAmount;
                    this.SendCount=res.SendCount
                    this.DeliveryAmount=res.DeliveryAmount
                    this.DeliveryCount=res.DeliveryCount
                })
        },

        getActiveTabindex(index){
            this.tabactive=index;
            if(index===1){
                this.$nextTick(()=>{
                    let main_box=this.$refs.main_box.clientHeight;
                    let searchHeader=this.$refs.searchHeader.clientHeight ;
                    this.$refs.list_box.style.height=(main_box-searchHeader)+'px'
                    /*在这里默认加载全部*/
                    this.onPullingUp();
                })
            }
        },
        getActiveSearchindex(index){
            if(this.requeststate){
                return ;
            }
            this.tabsearchactive=index;
            this.onPullingUp();
        },
        onPullingUp(){
            var _self=this;
            _self.requeststate=true;
            if(this.tabactive){
                var pageNo;/*当前调用哪个类型的页码*/
                var tabsearchactiveIndex=this.tabsearchactive;
                switch (tabsearchactiveIndex){
                    case 0:
                        if(this.allpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.allpageSize;
                        break;
                    case 1:
                        if(this.receiveNotpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.receiveNotpageSize;
                        break;
                    case 2:
                        if(this.collectedpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.collectedpageSize;
                        break;
                    case 3:
                        if(this.returnpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.returnpageSize;
                        break;
                }
                var state=this.searchlist[tabsearchactiveIndex].value;
                /*省市不传则为全网*/
                this.$store.dispatch('getListCompany',{
                    // siteId:_self.$store.state.userinfo.companyId,/*指点网点的时候传，全部则传空*/
                    siteId:'',
                    beginTime:_self.searchbeginTime,
                    endTime:_self.searchendTime,
                    province:_self.searchprovince,
                    city:_self.searchcity,
                    pageSize:this.pageSize,
                    pageNo:pageNo,
                    timeType:_self.searchtimeType,
                    status:state
                })
                    .then(res=>{
                        switch (tabsearchactiveIndex){
                            case 0:
                                _self.allinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.alllist=_self.alllist.concat(res.Details);
                                _self.allpageSize=_self.allpageSize+1;

                                if(_self.alllist.length==res.RecordCount){
                                    _self.allpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.allpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.allpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 1:
                                _self.receiveinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.receiveNotlist=_self.receiveNotlist.concat(res.Details);
                                _self.receiveNotpageSize=_self.receiveNotpageSize+1;

                                if(_self.receiveNotlist.length==res.RecordCount){
                                    _self.receiveNotpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.receiveNotpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.receiveNotpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 2:
                                _self.collectedinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.collectedlist=_self.collectedlist.concat(res.Details);
                                _self.collectedpageSize=_self.collectedpageSize+1;

                                if(_self.collectedlist.length==res.RecordCount){
                                    _self.collectedpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.collectedpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.collectedpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 3:
                                _self.returninfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.returnlist=_self.returnlist.concat(res.Details);
                                _self.returnpageSize=_self.returnpageSize+1;

                                if(_self.returnlist.length==res.RecordCount){
                                    _self.returnpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.returnpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.returnpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                        };

                        _self.requeststate=false;/*请求结束*/
                    })
            }


        },

        /*下拉刷新*/
        onPullingDown(){
            var _self=this;
            switch (this.tabsearchactive){
                case 0:
                    _self.allinfo=null;/*全网基本信息 票数什么的*/
                    _self.alllist=[];
                    _self.allpageSize=1;
                    _self.allpagestate=false;
                    /*全部*/
                    _self.allpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 1:
                    _self.receiveinfo=null;
                    _self.receiveNotlist=[];
                    _self.receiveNotpageSize=1;
                    _self.receiveNotpagestate=false;
                    _self.receiveNotpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 2:
                    _self.collectedinfo=null;
                    _self.collectedlist=[];
                    _self.collectedpageSize=1;
                    _self.collectedpagestate=false;
                    _self.collectedpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 3:
                    _self.returninfo=null;
                    _self.returnlist=[];
                    _self.returnpageSize=1;
                    _self.returnpagestate=false;
                    _self.returnpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;

            }

            this.onPullingUp();
        },

    },

}



/*网点home*/
export const NetDotMixin={
    data(){
        return{
            tabsearchactive:0,
            beginTime:this.$Check.gettimeformate(),/*默认进来页面的查询日期*/
            endTime:this.$Check.gettimeformate(),

            searchlist:[{name:'全部',value:-1},{name:'未收款',value:0},{name:'派方已收',value:1},{name:'已返款',value:2}],
            /*网点代收状态列表属性*/

            requeststate:false,

                // searchbeginTime:'2018-06-27',
                // searchendTime:'2018-06-27',

            searchbeginTime:this.$Check.gettimeformate(),
            searchendTime:this.$Check.gettimeformate(),

            searchstatus:-1,
            searchtimeType:'S',

            pageSize:20,
            startY: 0,  // 纵轴方向初始化位置
            scrollToX: 0,
            scrollToY: 0,
            scrollToTime: 500,
            scrollbarObj: false,
            pullDownRefreshObj: {
                threshold: 50,
                stop: 0
            },


            allinfo:null,/*全网基本信息 票数什么的*/
            alllist:[],
            allpageSize:1,
            allpagestate:false,
            /*全部*/
            allpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*未收款*/
            receiveinfo:null,/*全网基本信息 票数什么的*/
            receiveNotlist:[],
            receiveNotpageSize:1,
            receiveNotpagestate:false,
            receiveNotpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*派方已收*/
            collectedinfo:null,/*全网基本信息 票数什么的*/
            collectedlist:[],
            collectedpageSize:1,
            collectedpagestate:false,
            collectedpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },

            /*已返款*/
            returninfo:null,/*全网基本信息 票数什么的*/
            returnlist:[],
            returnpageSize:1,
            returnpagestate:false,
            returnpullUpLoadObj: {
                threshold: 0,
                txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                }
            },



        }
    },
    created(){
        this.getsearchToday();
    },
    computed:{
        allCount:function(){
            return this.SendCount+this.DeliveryCount;
        }
    },
    watch:{
        'tabactive':function (value) {
            if(value===0){
                this.getsearchToday();
            }
        }
    },
    methods:{
        /*查询今日数据*/
        getsearchToday(){
            /*默认查今日的数据*/
            this.$store.dispatch('getNetDotBill',{siteId:this.$store.state.userinfo.companyId,beginTime:this.beginTime,endTime:this.endTime})
                .then(res=>{
                    this.SendAmount=res.SendAmount;
                    this.SendCount=res.SendCount
                    this.DeliveryAmount=res.DeliveryAmount
                    this.DeliveryCount=res.DeliveryCount
                })
        },

        getActiveTabindex(index){
            this.tabactive=index;
            if(index===1){
                this.$nextTick(()=>{
                    let main_box=this.$refs.main_box.clientHeight;
                    let searchHeader=this.$refs.searchHeader.clientHeight ;
                    this.$refs.list_box.style.height=(main_box-searchHeader)+'px'
                    /*在这里默认加载全部*/
                    this.onPullingUp();
                })
            }
        },

        getActiveSearchindex(index){
            if(this.requeststate){
                return ;
            }
            this.tabsearchactive=index;
            this.onPullingUp();
        },


        onPullingUp(){
            var _self=this;
            _self.requeststate=true;
            if(this.tabactive){
                var pageNo;/*当前调用哪个类型的页码*/
                var tabsearchactiveIndex=this.tabsearchactive;
                switch (tabsearchactiveIndex){
                    case 0:
                        if(this.allpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.allpageSize;
                        break;
                    case 1:
                        if(this.receiveNotpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.receiveNotpageSize;
                        break;
                    case 2:
                        if(this.collectedpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.collectedpageSize;
                        break;
                    case 3:
                        if(this.returnpagestate){
                            _self.requeststate=false;
                            return ;
                        }
                        pageNo=_self.returnpageSize;
                        break;
                }
                var state=this.searchlist[tabsearchactiveIndex].value;

                this.$store.dispatch('getListNetDot',{
                    siteId:_self.$store.state.userinfo.companyId,
                    beginTime:_self.searchbeginTime,
                    endTime:_self.searchendTime,
                    pageSize:this.pageSize,
                    pageNo:pageNo,
                    timeType:_self.searchtimeType,
                    status:state
                })
                    .then(res=>{
                        switch (tabsearchactiveIndex){
                            case 0:
                                _self.allinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.alllist=_self.alllist.concat(res.Details);
                                _self.allpageSize=_self.allpageSize+1;

                                if(_self.alllist.length==res.RecordCount){
                                    _self.allpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.allpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.allpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 1:
                                _self.receiveinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.receiveNotlist=_self.receiveNotlist.concat(res.Details);
                                _self.receiveNotpageSize=_self.receiveNotpageSize+1;

                                if(_self.receiveNotlist.length==res.RecordCount){
                                    _self.receiveNotpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.receiveNotpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.receiveNotpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 2:
                                _self.collectedinfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.collectedlist=_self.collectedlist.concat(res.Details);
                                _self.collectedpageSize=_self.collectedpageSize+1;

                                if(_self.collectedlist.length==res.RecordCount){
                                    _self.collectedpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.collectedpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.collectedpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                            case 3:
                                _self.returninfo={TotalAmoun:res.TotalAmoun,RecordCount:res.RecordCount};
                                _self.returnlist=_self.returnlist.concat(res.Details);
                                _self.returnpageSize=_self.returnpageSize+1;

                                if(_self.returnlist.length==res.RecordCount){
                                    _self.returnpagestate=true;
                                    _self.$refs.scroll.forceUpdate(false);
                                    _self.returnpullUpLoadObj=false;
                                }else{
                                    _self.$refs.scroll.forceUpdate(true);
                                    _self.returnpullUpLoadObj={
                                        threshold: 0,
                                        txt: {
                                            more: '加载更多',
                                            noMore: '没有更多数据了'
                                        }
                                    };
                                }
                                break;
                        };

                        _self.requeststate=false;/*请求结束*/
                    })
            }


        },


        /*下拉刷新*/
        onPullingDown(){
            var _self=this;
            switch (this.tabsearchactive){
                case 0:
                    _self.allinfo=null;/*全网基本信息 票数什么的*/
                    _self.alllist=[];
                    _self.allpageSize=1;
                    _self.allpagestate=false;
                    /*全部*/
                    _self.allpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 1:
                    _self.receiveinfo=null;
                    _self.receiveNotlist=[];
                    _self.receiveNotpageSize=1;
                    _self.receiveNotpagestate=false;
                    _self.receiveNotpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 2:
                    _self.collectedinfo=null;
                    _self.collectedlist=[];
                    _self.collectedpageSize=1;
                    _self.collectedpagestate=false;
                    _self.collectedpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;
                case 3:
                    _self.returninfo=null;
                    _self.returnlist=[];
                    _self.returnpageSize=1;
                    _self.returnpagestate=false;
                    _self.returnpullUpLoadObj= {
                        threshold: 0,
                        txt: {
                            more: '加载更多',
                            noMore: '没有更多数据了'
                        }
                    }
                    break;

            }

            this.onPullingUp();
        },

    },


}
