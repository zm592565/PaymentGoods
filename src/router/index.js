import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store';


const NoOpening=(resolve) => {
    import('@/components/common/develop').then((module) => {
        resolve(module)
    })
}

const Home=(resolve) => {
  import('@/components/netDot/home').then((module) => {
    resolve(module)
  })
}
const companyHome=(resolve) => {
    import('@/components/company/home').then((module) => {
        resolve(module)
    })
}
const ReceivingBill=(resolve) => {
    import('@/components/netDot/ReceivingBill').then((module) => {
        resolve(module)
    })
}

const Detail=(resolve) => {
    import('@/components/common/detailInfo').then((module) => {
        resolve(module)
    })
}
const Search=(resolve) => {
    import('@/components/netDot/search').then((module) => {
        resolve(module)
    })
}
const SelectDate=(resolve) => {
    import('@/components/netDot/selectdate').then((module) => {
        resolve(module)
    })
}


Vue.use(Router)

const router=new Router({
  routes: [
    {
      name:'home',
      path:'/home',
      component:Home
    },
    {
      name:'company',
      path:'/company',
      component:companyHome
    },
    {
      name:'receivingbill',
      path:'/receivingbill',
      component:ReceivingBill
    },
    {
        name:'detail',
        path:'/detail',
        component:Detail
    },
    {
        name:'search',
        path:'/search',
        component:Search
    },
      {
          name:"selectdate",
          path:"/selectdate",
          component:SelectDate
      },
      {
          name:"noopen",
          path:"/noopen",
          component:NoOpening
      }
  ]
})



export default router;
