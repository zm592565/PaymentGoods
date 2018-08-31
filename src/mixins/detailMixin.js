import transparent from '@/assets/img/transparent.png'
export const Detail={
    data(){
        return{
            billCode:null,
            tabactive:0,
            expressactive:0,
            classlist:[{name:'总部代收账单',value:0},{name:'代收状态查询',value:1}],
            showinfostate:true,
            expresssateElselist:[{name:'已揽件',value:0},{name:'运输中',value:1},{name:'派件中',value:2},{name:'已签收',value:3},{name:'其他',value:4}],
            expresssatelist:[{name:'已揽件',value:0},{name:'运输中',value:1},{name:'派件中',value:2},{name:'已签收',value:3}],
            showinfo:null,
            type:'',
            isElseState:false,/*是否显示带其他状态*/
            expresslist:[],/*物流节点*/
        }
    },
    created(){
        this.type=this.$route.query.type
        this.billCode=this.$route.query.billCode;
        this.getOrdernodeInfo();
        this.getShow();
    },
    filters:{
        fomartDate(value){
            var arr=[];
            if(value.length){
                arr=value.split(' ')
            }
            return arr[0]
        },
        fomartDateHour(value){
            var arr=[];
            if(value.length){
                arr=value.split(' ')
            }
            return arr[1]
        }

    },
    methods:{

        /*查询物流*/
        getOrdernodeInfo(){
            this.$store.dispatch('checkExpress',this.billCode)
                .then(res=>{
                    if (res.length){
                        this.expresslist=res;
                        this.getExpressState(res[0].scanType)
                    }
                })
        },


        /*查询info*/
        getShow(){
            this.$store.dispatch('getOrderInfo',{billCode:this.billCode})
                .then(res=>{
                    this.showinfo=res;
                    this.mapinit({longitude:this.showinfo.SendSiteDetail.longitude,latitude:this.showinfo.SendSiteDetail.latitude,netName:this.showinfo.SendSite},{longitude:this.showinfo.DeliverySiteDetail.longitude,latitude:this.showinfo.DeliverySiteDetail.latitude,netName:this.showinfo.DeliverySite})
                })
        },

        /*自定义百度地图覆盖物*/
        setMineBaidu(center,textinfo,type){

            var typeText=type?'寄':'收';
            var typeBackColor=type?'#FE7621':'#13BF71';

            // 定义自定义覆盖物的构造函数
            function SquareOverlay(){}
            // 继承API的BMap.Overlay
            SquareOverlay.prototype = new BMap.Overlay();


            // 实现初始化方法
            SquareOverlay.prototype.initialize = function(map){
                // 保存map对象实例
                this._map = map;
                // 创建div元素，作为自定义覆盖物的容器
                var div = document.createElement("div");
                div.style.position = "absolute";

                // 可以根据参数设置元素外观
                div.style.height='30px';
                div.style.background='#fff';
                div.style.display='flex';
                div.style.flexFlow='row nowrap';
                div.style.justifyContent='flex-start';
                div.style.alignItems='center';
                div.style.borderRadius='4px';
                div.style.boxShadow='0px 4px 8px 0px rgba(0,0,0,0.15)';
                div.style.Width = "120px";
                div.innerHTML='<span style="width: 30px;height: 30px;border-bottom-left-radius: 4px;border-top-left-radius: 4px; text-align:center;line-height:30px;font-size:14px;color:white;background:'+typeBackColor+'">'+typeText+'</span>' +
                    '<cite style="background:white;word-break: keep-all;white-space: nowrap;font-size: 12px;padding: 0px 8px">'+textinfo+'</cite>' +
                    '<div style="position: absolute;width: 20px;height: 20px;background: #fff;bottom: -30px;left: 50px;border-radius: 10px;border: 4px solid #FE7621"></div>';


                // 将div添加到覆盖物容器中
                map.getPanes().markerPane.appendChild(div);
                // 保存div实例
                this._div = div;
                // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
                // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
                return div;
            }


            // 实现绘制方法
            SquareOverlay.prototype.draw = function(){
                // 根据地理坐标转换为像素坐标，并设置给容器
                var position = this._map.pointToOverlayPixel(center);
                this._div.style.left = position.x-60 + "px";
                this._div.style.top = position.y-40+ "px";
            }

            // 添加自定义覆盖物
            var mySquare = new SquareOverlay(center,textinfo,type);

            return mySquare
        },

        mapinit(statrt,end={longitude:'116.508328',latitude:'39.919141',netName:'杭州申通'},){
            var _self=this;
            var map = new BMap.Map('container');

            map.setMapStyle({
                styleJson:[[
                    {
                        "featureType": "subwaystation",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#c6dbceff",
                            "weight": "1"
                        }
                    }
                ]]
            });

            var p1 = new BMap.Point(statrt.longitude,statrt.latitude);/*设置起点坐标这里也可以传文字*/
            var p2 = new BMap.Point(end.longitude,end.latitude);/*终点*/

            /*调用规划路线插件*/
            var driving = new BMap.DrivingRoute(map, {renderOptions:
                {
                    map: map,
                    autoViewport: false,
                },
                onPolylinesSet:function(routes) {
                    let searchRoute = routes[0].getPolyline();//导航路线
                    searchRoute.setStrokeColor('#FE7621')/*设置折现的颜色*/
                    searchRoute.setStrokeOpacity(1)/*设置透明度*/
                    searchRoute.setStrokeWeight(4)/*宽度*/
                    map.addOverlay(searchRoute);
                },
            });

            /*查出规划路线*/
            driving.search(p1, p2);


            /*设置添加标注后的回调函数,规划路线回调*/
            driving.setMarkersSetCallback(function (res) {

                /*把起始点和终点的图标去除*/
                var icon=new BMap.Icon(transparent,new BMap.Size(20,20))
                res[0].marker.setIcon(icon)
                res[1].marker.setIcon(icon)

                res[0].marker.addEventListener("click", function(){
                    /*给起点加点击事件*/
                })

                /*
                添加自定义覆盖物
                type 1 是寄件 0 是收
                */

                var mySquare = _self.setMineBaidu(res[0].point, statrt.netName, 1);
                var mySquare1 = _self.setMineBaidu(res[1].point, end.netName, 0);

                map.addOverlay(mySquare);
                map.addOverlay(mySquare1);
            })

            /*设置检索结束后的回调函数*/
            driving.setSearchCompleteCallback(function(res){
                    var marginss=[];
                    if(_self.type=='net'){
                        marginss=[100, 80, 80, 80]
                    }else{
                        marginss=[140, 80, 40, 80]
                    }
                    /*通过设置margin来平移视图*/
                    map.setViewport([p1,p2],{
                        margins: marginss
                    })
            })


        },

        /*过滤物流状态*/
        getExpressState(value){
            this.isElseState=false;
            /*收件,发件,到件,派件,第三方代收,签收,问题件,留仓件,发包,到包,发车,装车,到车*/
            switch (value){
                case '收件':
                    this.expressactive=0;
                    break;
                case '发件':
                case '装袋':
                case '到件':
                case '发包':
                case '到包':
                case '发车':
                case '装车':
                case '到车':
                    this.expressactive=1;
                    break;
                case '派件':
                case '第三方代收':
                case '代取快递':
                case '派件入柜':
                    this.expressactive=2;
                    break;
                case '签收':
                case '已签收':
                    this.expressactive=3;
                    break;
                case '疑难件':
                case '留仓件':
                case '货件留仓':
                    this.isElseState=true;
                    this.expressactive=4;
                    break;
                default:
                    this.isElseState=true;
                    this.expressactive=4;
                    break;
            }

        },
    }
}