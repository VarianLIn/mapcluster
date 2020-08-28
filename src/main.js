import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
// import Routers from './router';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';
import BaiduMap from 'vue-baidu-map';
import axios from 'axios';
import { router } from './router/index';

// Vue.use(axios);
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'H7dID6dU90DKKydvDnGAg5lgWpGACVZQ',
});

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

// 路由配置
// const RouterConfig = {
//     // mode: 'history',
//     routes: Routers,
// };
// const router = new VueRouter(RouterConfig);

// router.beforeEach((to, from, next) => {
//     ViewUI.LoadingBar.start();
//     Util.title(to.meta.title);
//     next();
// });

// router.afterEach((to, from, next) => {
//     ViewUI.LoadingBar.finish();
//     window.scrollTo(0, 0);
// });

new Vue({
    el: '#app',
    router: router,
    render: (h) => h(App),
});
