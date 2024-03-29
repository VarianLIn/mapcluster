// const routers = [
//     {
//         path: '/',
//         name: 'home',
//         meta: {
//             title: 'home',
//         },
//         component: (resolve) => require(['./views/mainpage/index.vue'], resolve),
//     },
//     {
//         path: '/map',
//         name: 'basemap',
//         meta: {
//             title: 'basemap',
//         },
//         component: (resolve) => require(['./views/mainpage/baidumap.vue'], resolve),
//     },
//     {
//         path: '/test',
//         name: 'test',
//         meta: {
//             title: 'test',
//         },
//         component: (resolve) => require(['./views/mainpage/test.vue'], resolve),
//     },
// ];
// export default routers;

import Main from '../views/mainpage/index.vue';
const pagerouters = [
    {
        path: '/view',
        name: 'view',
        component: Main,
        redirect: '/view/home',
        // meta: {
        //     title: '首页',
        //     icon: '&#xe6bd;',
        // },
        children: [
            {
                path: 'home',
                // name: 'home',
                meta: {
                    title: '首页',
                    bottom: true,
                    icon: 'iconfont icon-shouye',
                },
                component: (resolve) => require(['../views/mainpage/componentPage/home.vue'], resolve),
            },
            {
                path: 'baidumap',
                // name: 'baidumap',
                meta: {
                    title: '百度地图',
                    bottom: false,
                    icon: 'iconfont icon-baiduditu',
                },
                component: (resolve) => require(['../views/mainpage/map/baidumap.vue'], resolve),
            },
            {
                path: 'geoglobemap',
                // name: 'geoglobemap',
                meta: {
                    title: 'Geoglobe地图',
                    bottom: false,
                    icon: 'iconfont icon-mapbox',
                },
                component: (resolve) => require(['../views/mainpage/map/geoglobemap.vue'], resolve),
            },
            {
                path: 'gaodemap',
                // name: 'gaodemap',
                meta: {
                    title: '高德地图',
                    bottom: false,
                    icon: 'iconfont icon-gaode',
                },
                component: (resolve) => require(['../views/mainpage/map/gaodemap.vue'], resolve),
            },
            {
                path: 'echartsMinage',
                // name: 'echartsMinage',
                meta: {
                    title: 'echarts迁徙',
                    bottom: false,
                    icon: 'iconfont icon-chengshiqianxitu',
                },
                component: (resolve) => require(['../views/mainpage/map/echartsMinage.vue'], resolve),
            },
            {
                path: 'ggMinage',
                // name: 'echartsMinage',
                meta: {
                    title: 'GeoGlobe迁徙',
                    bottom: false,
                    icon: 'iconfont icon-qianxitu',
                },
                component: (resolve) => require(['../views/mainpage/map/geoGMinage.vue'], resolve),
            },
            {
                path: 'other',
                // name: 'other',
                meta: {
                    title: '其他',
                    bottom: true,
                    icon: 'iconfont icon-qita',
                },
                component: (resolve) => require(['../views/mainpage/componentPage/other.vue'], resolve),
            },
            {
                path: '3dGlobe',
                // name: 'echartsMinage',
                meta: {
                    title: '三维地球',
                    bottom: false,
                    icon: 'iconfont icon-Dqianxitu',
                },
                component: (resolve) => require(['../views/mainpage/3dmap/3dGlobe.vue'], resolve),
            },
            {
                path: '3dmigrationMap',
                // name: 'echartsMinage',
                meta: {
                    title: '三维迁徙',
                    bottom: false,
                    icon: 'iconfont icon-Dqianxitu',
                },
                component: (resolve) => require(['../views/mainpage/3dmap/3dmigrationMap.vue'], resolve),
            },
            {
                path: 'echarts',
                // name: 'echartsMinage',
                meta: {
                    title: 'eChart',
                    bottom: true,
                    icon: 'iconfont icon-qita',
                },
                component: (resolve) => require(['../views/mainpage/charts/chart_1.vue'], resolve),
            },
            // {
            //     path: 'd3chart',
            //     // name: 'echartsMinage',
            //     meta: {
            //         title: 'd3Chart',
            //         bottom: true,
            //         icon: 'iconfont icon-qita',
            //     },
            //     component: (resolve) => require(['../views/mainpage/charts/d3chart.vue'], resolve),
            // },
            {
                path: 'jxmapdemo',
                // name: 'echartsMinage',
                meta: {
                    title: 'jxmapdemo',
                    bottom: false,
                    icon: 'iconfont icon-ditu',
                },
                component: (resolve) => require(['../views/mainpage/map/jxmapdemo.vue'], resolve),
            },
        ],
    },
];
// export default [...pagerouters];
export const routers = pagerouters;
