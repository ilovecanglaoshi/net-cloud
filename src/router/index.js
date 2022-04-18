import Vue from 'vue'
import VueRouter from 'vue-router'
import History from '@/utils/history'
Vue.use(VueRouter)
Vue.use(History)
const routes = [
  {
    path: '/',
    name: 'FindMusic',
    component: () => import(/* webpackChunkName: "FindMusic" */ '../views/find-music/index.vue'),
    // component: () => import(/* webpackChunkName: "PersonalFM" */ '../views/personalFm.vue'),
    // redirect: '/findMusic/personalRecommend',
    redirect: '/findMusic/personalRecommend',
    children:[
      {
        path: '/findMusic/personalRecommend',
        name: 'PersonalRecommend',
        component: () => import(/* webpackChunkName: "PersonalRecommend" */ '../views/find-music/components/personal-recommend.vue'),
        // component:PersonalRecommend
      },
      {
        path: 'findMusic/songList',
        name: 'SongList',
        component: () => import(/* webpackChunkName: "SongList" */ '../views/find-music/components/song-list.vue'),
      },
      {
        path: 'findMusic/hostRadio',
        name: 'HostRadio',
        component: () => import(/* webpackChunkName: "HostRadio" */ '../views/find-music/components/host-radio.vue'),
      },
      {
        path: 'findMusic/rank',
        name: 'Rank',
        component: () => import(/* webpackChunkName: "Rank" */ '../views/find-music/components/rank.vue'),
      },
      {
        path: 'findMusic/singer',
        name: 'Singer',
        component: () => import(/* webpackChunkName: "Singer" */ '../views/find-music/components/singer.vue'),
      },
      {
        path: 'findMusic/newMusic',
        name: 'NewMusic',
        component: () => import(/* webpackChunkName: "NewMusic" */ '../views/find-music/components/new-music.vue'),
      },
    ]
  },
  {
    path: '/personalFm',
    name: 'PersonalFM',
    // component: PersonalFM
    component: () => import(/* webpackChunkName: "PersonalFM" */ '../views/personalFm.vue')
  },
  {
    path: '/video',
    name: 'Video',
    // component: Video
    component: () => import(/* webpackChunkName: "Video" */ '../views/video.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    // component: Video
    component: () => import(/* webpackChunkName: "Friend" */ '../views/friends.vue')
  },
  {
    path: '/itunesMusic',
    name: 'ItunesMusic',
    // component: Video
    component: () => import(/* webpackChunkName: "ItunesMusic" */ '../views/itunes-music.vue')
  },
  {
    path: '/downloadManage',
    name: 'DownloadManage',
    // component: Video
    component: () => import(/* webpackChunkName: "DownloadManage" */ '../views/download-manage.vue')
  },
  {
    path: '/recentPlay',
    name: 'RecentPlay',
    // component: Video
    component: () => import(/* webpackChunkName: "RecentPlay" */ '../views/recent-play.vue')
  },
  {
    path:'/songlist/dayRecommend/:type',
    name:'SongList',
    component: () => import(/* webpackChunkName: "SongList" */ '@/components/songList.vue'),
  },
  {
    path:'/songlist/:type/:id',
    name:'SongList',
    component: () => import(/* webpackChunkName: "SongList" */ '@/components/songList.vue'),
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login.vue'),
  },
]
// 实例化之前，扩展Router
VueRouter.prototype.goBack = function () {
  this.isBack = true;
  this.back();
}
// 实例化之前，扩展Router
VueRouter.prototype.goForward = function () {
  this.isForward = true;
  this.forward();
}
const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
})
// // // afterEach记录历史记录
// router.afterEach((to) => {
//   // if (!router.isBack) {
//   //   // 后退
//   //   // History.pop();
//   //   router.isBack = false;
//   // } 
//   if(!router.isForward || !router.isBack) {

//     History.push(to.path);
   
//   }
//   if(router.isForward) {
//     router.isForward = false
//   }
//   if(router.isBack) {
//     router.isBack = false
//   }
// })
router.beforeEach((to, from, next) => {
  console.log(to, 'tototototot');
  console.log(from, 'fromfromfrom');
  next()
})

export default router
