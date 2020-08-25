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
                },
                component: (resolve) => require(['../views/mainpage/home.vue'], resolve),
            },
            {
                path: 'baidumap',
                // name: 'baidumap',
                meta: {
                    title: '百度地图',
                },
                component: (resolve) => require(['../views/mainpage/map/baidumap.vue'], resolve),
            },
            {
                path: 'geoglobemap',
                // name: 'geoglobemap',
                meta: {
                    title: 'Geoglobe地图',
                },
                component: (resolve) => require(['../views/mainpage/map/geoglobemap.vue'], resolve),
            },
            {
                path: 'gaodemap',
                // name: 'gaodemap',
                meta: {
                    title: '高德地图',
                },
                component: (resolve) => require(['../views/mainpage/map/gaodemap.vue'], resolve),
            },
            {
                path: 'echartsMinage',
                // name: 'echartsMinage',
                meta: {
                    title: 'echarts迁徙',
                },
                component: (resolve) => require(['../views/mainpage/map/echartsMinage.vue'], resolve),
            },
            {
                path: 'other',
                // name: 'other',
                meta: {
                    title: '其他',
                },
                component: (resolve) => require(['../views/mainpage/other.vue'], resolve),
            },
            {
                path: '3dmigrationMap',
                // name: 'echartsMinage',
                meta: {
                    title: 'echarts迁徙',
                },
                component: (resolve) => require(['../views/mainpage/3dmap/3dmigrationMap.vue'], resolve),
            },
        ],
    },
];
// export default [...pagerouters];
export const routers = pagerouters;
