import {Commpn_api} from '@/api/api'
/*上传文件类公共mixin*/
export const Methods={
  data(){
    return{
      picitems:[],
      maxsize:9,
    }
  },
  methods:{

    /*单独配置上传axiosconfig*/
    customaxiosConfig(url){
      let obj={
        baseURL: url,/*测试接口地址*/
        retry: 4,
        retryDelay: 1000,
        timeout: 20000,
        withCredentials:true,
        headers: {'Content-Type': 'application/json','source':'jn','userId':this.$store.state.userinfo.id,'clientType':'H5'},
      }
      return obj
    },


    addClick(){
      if(this.picitems.length&&this.picitems.length>this.maxsize){
         this.$Tools.TestTost(`最多上传${maxsize}张图片`);
         return ;
      }
      this.$refs.addBtn_pic.click()
    },
    /*上传图片*/
    updataPic(e){
      var loading=this.$Tools.getTost('正在上传...')
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append('file',file);//通过append向form对象添加数据
      param.append('thumbnail',true);
      this.$function.requestHttpMethods(Commpn_api.uploadPic,param,false,'post',this.customaxiosConfig(Commpn_api.uploadUrl))
      .then((res) => {
        loading.clear()
        if(res.respCode === '000'){
          this.picitems.push(res.data) //外网
        }else {
          this.$Tools.TestTost(res.resMessage)
        }
      })
    },

    /*delpiclist*/
    delpiclist(index,num=1){
      this.picitems.splice(index,num);
    },

    /*针对单张图片上传接口组装上传图片数据字符串*/
    formartListPic(){
      var backstr='';
      if(this.picitems.length){
        var arr=[];
        for(let i=0;i<this.picitems.length;i++){
          arr.push(Commpn_api.netUrl+this.picitems[i].fileLink)
        }
        backstr=arr.join(',');
      }
      return backstr;
    }

  }



}
